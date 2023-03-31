<script setup lang="ts">
import { ref, reactive, Ref, onMounted, computed } from 'vue';
import router from './../../../router/index';
// import loginUserFn from './userList.jsx'
// const loginUser = loginUserFn()

const form = reactive({
    username: '',
    password: ''
});
const userFrom = reactive({
    vip: '',
    admin: ''
})
const islogin = ref(true)
// 定义表单ref
const rulesRef: Ref = ref(null);
// 定义用户表单ref
const rulesRefUser: Ref = ref(null);

// 用户列表,每个大的vip都有一个子会员，子会员是一个数组
const userList = ref(JSON.parse(localStorage.getItem('userList') as string) || [{ 'vip': ['admin'] }, { 'vip2': ['admin2', 'admin3'] }])
console.log(userList);

const onSubmit = () => {
    if (islogin.value) {
        rulesRef.value.validate(() => {
            // 正确的用户名是userList的第一层和第二层的字符串值，判断是否存在
            const templist1 = userList.value.map((item: any) => {
                const templist2 = Object.values(item).map((item2: any) => {
                    return item2.map((item3: any) => {
                        return Object.keys(item)[0] + '-' + item3
                    })
                })
                return templist2
            }).flat(2);
            // 再把userList的第一层push到templist里面
            userList.value.forEach((item: any) => {
                templist1.push(Object.keys(item)[0])
            })
            // templist数组去重
            const templist = templist1.filter((item: any, index: any) => templist1.indexOf(item) === index);
            // console.log('所有用户的一个数组', templist);

            // 得到满足条件的元素
            let index = templist.find((item: any) => item === form.username);
    
            if (index === undefined) {
                console.log('用户名或密码错误1');
                return
            }
            // 找一个字符串里面有没有-
            const query = ref({
                vip: index.split('-')[0],
                admin: index
            })

            if (index.indexOf('-') > -1) {
                console.log('子会员登录');
                query.value = {
                    vip: index.split('-')[0],
                    admin: index
                }
                console.log(query.value);
            } else {
                console.log('大会员登录');
                query.value = {
                    vip: index,
                    admin: undefined
                }
                // 大会员登录，把子会员列表拿到
                let index2 = userList.value.find((item: any) => Object.keys(item)[0] === index);
                console.log(index2);
                // 拿到index2第一层的大会员和第二层的子会员，子会员用大会员-子会员的形式，生成一个数组
                const templist2 = Object.values(index2).map((item2: any) => {
                    return item2.map((item3: any) => {
                        return Object.keys(index2)[0] + '-' + item3
                    })
                }).flat(1);
                templist2.unshift(index)
                console.log(templist2);
                // loginUser.setState(templist2)
                localStorage.setItem('needUserList', JSON.stringify(templist2));
            }
            // 登录成功，路由跳转
            router.push({
                path: '/wednesday/vip/vip1',
                query: query.value
            })
        });
    } else {
        rulesRefUser.value.validate(() => {
            if (userFrom.vip === '' || userFrom.admin === '') return
            let index = userList.value.find((item: any) => Object.keys(item)[0] === userFrom.vip);
            let thisindex = userList.value.findIndex((item: any) => Object.keys(item)[0] === userFrom.vip);
            console.log(index)
            if (index === undefined) {
                const newVip = {
                    [userFrom.vip]: [userFrom.admin]
                }
                userList.value.push(newVip);
            } else {
                const name = Object.keys(index) as unknown as string;
                let index2 = index[name].find((item: any) => {
                    console.log(item, userFrom.admin);
                    return item === userFrom.admin
                });
                console.log(index2);
                if(index2 !== undefined) {
                    alert('账户已经存在')
                    return
                } else {
                    userList.value[thisindex][name].push(userFrom.admin)
                }
            }
            console.log(userList.value);
            localStorage.setItem('userList', JSON.stringify(userList.value));
        });
    }

};
// 注册
const logon = () => {
    islogin.value = !islogin.value
}

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur', },
        { min: 6, max: 6, message: '123456', trigger: 'blur' }
    ]
});
const rules1 = reactive({
    vip: [
        { required: true, message: '会员', trigger: 'blur' },
    ],
    admin: [
        { required: true, message: '子会员', trigger: 'blur', },
    ]
});
// console.log(loginUser.state.userList);

</script>

<template>
    <button @click="router.push('/Wednesday/vip/vip1')">1</button>
    <button @click="router.push('/Wednesday/vip/test')">2</button>
    <router-view></router-view>
    <div class="box">
        <el-card class="el-card" header="">
            <el-form :model="form" label-width="120px" :rules="rules" ref="rulesRef" v-if="islogin">
                <el-form-item label="用户名：" prop="username" label-width="80px">
                    <el-input v-model="form.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码：" prop="password" label-width="80px">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password />
                </el-form-item>
                <el-button size="medium" type="primary" @click="logon">注册</el-button>
                <el-button size="medium" type="primary" @click="onSubmit" class="btn">登录</el-button>
            </el-form>
            <el-form :model="userFrom" label-width="120px" :rules="rules1" ref="rulesRefUser" v-else="islogin">
                <el-form-item label="会员：" prop="vip" label-width="80px">
                    <el-input v-model="userFrom.vip" placeholder="会员" />
                </el-form-item>
                <el-form-item label="子会员：" prop="admin" label-width="80px">
                    <el-input v-model="userFrom.admin" placeholder="子会员" />
                </el-form-item>
                <el-button size="medium" type="primary" @click="onSubmit">{{ islogin ? '登录' : '确定' }}</el-button>
                <el-button size="medium" type="primary" @click="logon" class="btn" v-if="islogin">注册</el-button>
                <el-button size="medium" type="primary" @click="logon" v-else="islogin">返回</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15%;

    .el-card {
        width: 300px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn {
        margin-left: 120px;
    }
}
</style>