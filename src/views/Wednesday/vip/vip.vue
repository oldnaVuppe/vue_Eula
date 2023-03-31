<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { TableColumnCtx } from 'element-plus'
// import useUserList from './../login/userList.jsx'
// const useUserList = require('./../login/userList.jsx')
const router = useRouter();

// const userList = useUserList()
// console.log(userList);

// 根据用户拿到商品列表
const user: any = router.currentRoute.value.query.admin ? router.currentRoute.value.query.admin : router.currentRoute.value.query.vip

const dingdanList = ref(JSON.parse((localStorage.getItem(user)) as string) || [
    {
        id: 1,
        name: '商品1',
        price: 100,
        count: 1
    },
    {
        id: 2,
        name: '商品2',
        price: 100,
        count: 2
    },
    {
        id: 3,
        name: '商品3',
        price: 50,
        count: 4
    },
    {
        id: 4,
        name: '商品4',
        price: 50,
        count: 40
    }
])
// 判断是大会员还是子会员
const needUserList: any = ref(undefined)
const list: any = ref([])
if (router.currentRoute.value.query.admin) {
    // console.log('子会员登录');
    needUserList.value = [router.currentRoute.value.query.admin]
} else {
    // console.log('大会员登录');
    needUserList.value = JSON.parse(localStorage.getItem('needUserList') as string)
    needUserList.value.forEach((el: string) => {
        // 循环用户列表，每个用户列表在loccalStorage里面都有一个对应的商品列表，没有就是空
        const listone = JSON.parse(localStorage.getItem(el) as string)
        // console.log(listone);
        list.value.push(listone)
        list.value[0] = dingdanList.value
    });
    // console.log('list', list.value);
}
// console.log(needUserList.value);

const ProductLists = ref([
    {
        id: 1,
        name: '商品1',
        price: 101,
        count: 1
    },
    {
        id: 2,
        name: '商品2',
        price: 102,
        count: 1
    },
    {
        id: 3,
        name: '商品3',
        price: 50,
        count: 1
    },
    {
        id: 4,
        name: '商品4',
        price: 501,
        count: 1
    }
])
// 用户列表
// 1.有一个商品列表，谁登录就是谁的列表，然后点击加入购物车就是把商品加到这个列表里面，再写删除的功能，修改数量的功能
// 2.计算商品的总价
// 3.判断是不是大会员登录，是的话就展示它和他下面的子会员的列表，不是的话就展示子会员它自己的列表

const add = (id: number) => {
    console.log('加入购物车了', id);
    // //判断dingdanList有没有，没有的话直接dingdanList.value[index].count++
    // if (dingdanList.value.length === 0) {
    //     dingdanList.value.push({
    //         id: id,
    //         name: ProductLists.value[id - 1].name,
    //         price: ProductLists.value[id - 1].price,
    //         count: 0
    //     })
    // }
    // 判断list[0]有没有，没有的话直接list[0]
    if (!list.value[0]) {
        dingdanList.value.push({
            id: id,
            name: ProductLists.value[id - 1].name,
            price: ProductLists.value[id - 1].price,
            count: 0
        })
    }
    // console.log(dingdanList.value);
    // 判断商品列表里面有没有这个商品，有的话就把数量加1，没有的话就把这个商品加到商品列表里面
    const index = dingdanList.value.findIndex((item: any) => item.id === id)
    if (index === -1) {
        // console.log('加入商品');
        // 购物车没有这个商品，需要把商品加到购物车里面，购物车就是dingdanList
        dingdanList.value.push(ProductLists.value[id - 1])
        // console.log(dingdanList.value);

    } else {
        dingdanList.value[index].count++
        // console.log('已经有了');
    }
}

const del = (row: any, e: any) => {
    console.log('删除了', row, e);
    dingdanList.value.splice(e, 1)
}

const handleChange = (e: any) => {
    console.log('修改了', e);
}

// 用watch存数据到localStorage,存数据的名字就用登录的用户名，通过router获取
watch(dingdanList.value, (newVal) => {
    localStorage.setItem(user as string, JSON.stringify(newVal));
    localStorage.setItem(needUserList.value, JSON.stringify(newVal))
})

// 获取用户列表
const userList = ref(JSON.parse(localStorage.getItem('userList') as string))
console.log(userList.value);
// 把userList拆分，每一个拆成一个数组，然后把每一个值放在一个数组里面
const test1: any = ref([])
userList.value?.forEach((el: any) => {
    const temp: any = ref([])
    temp.value.push(Object.keys(el))
    temp.value.push(Object.values(Object.values(el)[0] as object))
    test1.value.push(temp.value)
})
console.log(test1);
const res: any = ref([])
test1.value.forEach((el: any) => {
    res.value.push([...el[0], ...el[1]]);
})
console.log(res);

const test = [
    {
        date: 'vip',
        name: '/',
    },
    {
        date: 'vip',
        name: 'admin',
    },
    {
        date: 'vip2',
        name: '/',
    },
    {
        date: 'vip2',
        name: 'admin2',
    },
    {
        date: 'vip2',
        name: 'admin3',
    },
    {
        date: 'test',
        name: '/',
    },
    {
        date: 'test',
        name: 'admin',
    }
]
// 把test里面每一项都放在element plus表格里，第一层在前面，第二层在后面，每一行还可以进行删除，修改功能
// 1.把test里面的每一项都放在element plus表格里面
// 2.把第一层和第二层分开，第一层在前面，第二层在后面
// 3.每一行还可以进行删除，修改功能
// 判断是添加还是修改
const isAdd = ref(true)
const dialogVisible = ref(false)
const thisUser = reactive({
    index: 0,
    $index: 0
})
const isrono = ref(false)
const isrono2 = ref(false)
const handleClose = () => {
    dialogVisible.value = false
    isrono.value = false
    isrono2.value = true
}
const ruleForm = ref({
    vip: '',
    admin: ''
})
// 添加用户
const addUser = (index: number) => {
    isAdd.value = true
    isrono2.value = true
    // index是第几行，第几行就是第几个会员
    dialogVisible.value = true
    thisUser.index = index
}
// 删除用户
const delUser = (index: number, $index: number) => {
    if ($index === 0) {
        res.value.splice(index, 1)
        return
    }
    res.value[index].splice($index, 1)
    // userList进行删除
    // let index1 = userList.value.findIndex((item: any) => Object.keys(item)[0] === res.value[index1][0]);
    // let index2 = userList.value[index1][res.value[index1][0]].findIndex((item: any) => item === res.value[index1][$index1]);
    // userList.value[index1][res.value[index1][0]].splice(index2, 1)
    // localStorage.setItem('userList', JSON.stringify(userList.value));
    console.log(index, $index);

    if ($index === 0) {
        console.log('删除了大会员');
        userList.value.splice(index, 1)
        userList.value.splice(index, 1)
        return
    } else {
        const temp = Object.keys(userList.value[index])[0]
        userList.value[index][temp].splice($index - 1, 1)
    }
    console.log(userList.value)
}
// 修改用户
const updateUser = (index: number, $index: number) => {
    isAdd.value = false
    if (ruleForm.value.admin === '') {
        // 如果为空，就禁用admin输入框
        console.log('ruleForm.value.admin');
        isrono.value = true
    } else {
        isrono.value = false
    }
    thisUser.index = index
    thisUser.$index = $index
    dialogVisible.value = true
    console.log(index, $index);
    if ($index === 0) {
        ruleForm.value.vip = res.value[index][0]
        ruleForm.value.admin = ''
        return
    }
    ruleForm.value.vip = res.value[index][0]
    ruleForm.value.admin = res.value[index][$index]

}
// 确定
const submitForm = () => {
    console.log('确定', isAdd);

    // 判断是添加还是修改
    if (isAdd.value) {
        console.log('添加');
        userList.value[thisUser.index][Object.keys(userList.value[thisUser.index])[0]].push(ruleForm.value.admin)
        localStorage.setItem('userList', JSON.stringify(userList.value));   
        res.value[thisUser.index].push('')
        res.value[thisUser.index].splice(res.value[thisUser.index].length - 1, 1, ruleForm.value.admin)
        dialogVisible.value = false
    } else {
        console.log('修改');
        console.log(ruleForm.value.admin);
        userList.value[thisUser.index][Object.keys(userList.value[thisUser.index])[0]].splice(thisUser.$index - 1, 1, ruleForm.value.admin)
        localStorage.setItem('userList', JSON.stringify(userList.value));   
        console.log(userList.value);
        dialogVisible.value = false
        // 怎么让res.value变为响应式的
        res.value[thisUser.index].splice(thisUser.$index, 1, ruleForm.value.admin)
        const q = res.value[thisUser.index].splice(res.value[thisUser.index].length - 1, 1) 
        res.value[thisUser.index].push(...q)
    }
}
// 取消
const resetForm = () => {
    dialogVisible.value = false
}

watch(res.value, (val) => {
    localStorage.setItem('userList', JSON.stringify(userList.value))
    console.log('watch', val);
    console.log(userList.value);
})
</script>

<template>
    123
    <div class="box1">
        <h3>用户：{{ router.currentRoute.value.query.vip }}</h3>
        <hr /><br />
        
        <!-- 用户列表 -->
        <el-card v-for="(item, index) in res">
            <el-button type="" @click="addUser(index)">新增用户</el-button>
            <template #header>会员：{{ item[0] }}</template>
            <el-table :data="item">
                <el-table-column prop="date" label="会员" width="180">
                    {{ item[0] }}
                </el-table-column>
                <el-table-column prop="name" label="子会员" width="180">
                    <template #default="{ row, $index }">
                        {{ $index ? item[$index] : '/' }}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template #default="{ row, $index }">
                        <el-button type="" @click="delUser(index, $index)">删除</el-button>
                        <el-button type="" @click="updateUser(index, $index)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 新增窗口 -->
        <el-dialog v-model="dialogVisible" :title="isAdd ? '新增' : '修改'" width="40%" :before-close="handleClose">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="会员" prop="vip">
                    <el-input :disabled="isrono2" v-model="ruleForm.vip" type="" autocomplete="off" />
                </el-form-item>
                <el-form-item label="子会员" prop="admin">
                    <el-input :disabled="isrono" v-model="ruleForm.admin" type="" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">确定</el-button>
                    <el-button @click="resetForm">返回</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--  -->
        <el-card>
            <el-row>
                <el-col :span="6" v-for="(item, index) in ProductLists" :key="index">
                    <el-card>
                        <el-icon>
                            <Cherry />
                        </el-icon>
                        <div slot="header" class="clearfix">
                            <span>{{ item.name }}</span>
                        </div>
                        <el-button type="primary" size="mini" style="margin-top: 10px"
                            @click="add(item.id)">加入购物车</el-button>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <!-- 订单表格 -->
        <div v-if="needUserList.length > 1">
            <el-card v-for="(item, index) in list">
                <template #header>
                    <span style="font-weight: 900;font-size: 20px;">{{ needUserList[index] }}</span>
                </template>
                <el-table :data="item" style="width: 100%">
                    <el-table-column prop="name" label="商品" width="160" />
                    <el-table-column prop="count" label="数量" width="180">
                        <template #default="{ $index }">
                            <el-input-number :disabled="index" v-model="item[$index].count" :min="1" :max="100"
                                @change="handleChange" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="订单操作">
                        <template #default="{ row, $index }">
                            <el-button :disabled="index" type="" @click="del(row, $index)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="单价" width="80" />
                    <el-table-column label="小计">
                        <template #default="{ $index }">
                            <span>{{ item[$index].price * item[$index].count }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-table>
                                                <el-table-column label=""></el-table-column>
                                            </el-table> -->
                <div>
                    <span>总价：￥{{ list[index] ? item.reduce((total: any, item: any) => total + item.price *
                        item.count, 0) : 0 }}</span>
                </div>
            </el-card>
        </div>
        <div v-else>
            <el-card>
                <template #header>
                    <span style="font-weight: 900;font-size: 20px;">{{ needUserList[0] }}</span>
                </template>
                <el-table :data="dingdanList" style="width: 100%" v-if="dingdanList[0]">
                    <el-table-column prop="name" label="商品" width="160" />
                    <el-table-column prop="count" label="数量" width="180">
                        <template #default="{ $index }">
                            <el-input-number v-model="dingdanList[$index].count" :min="1" :max="100"
                                @change="handleChange" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="订单操作">
                        <template #default="{ row, $index }">
                            <el-button type="" @click="del(row, $index)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="单价" width="80" />
                    <el-table-column label="小计">
                        <template #default="{ $index }">
                            <span>{{ dingdanList[$index].price * dingdanList[$index].count }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div>
                    <span>总价：￥{{ dingdanList.reduce((total: any, item: any) => total + item.price *
                        item.count, 0) }}</span>
                </div>
            </el-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box1 {
    padding: 14px;
}
</style>