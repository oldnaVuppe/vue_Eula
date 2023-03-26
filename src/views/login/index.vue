<script lang="ts" setup>
import { ref, reactive, Ref, onMounted, computed } from 'vue';
import { Eleme } from '@element-plus/icons-vue'
import { login } from './../../api/login';
import router from './../../router';

// import Vuex3 from './../../store/index.jsx';
// const Vue1 = Vuex3();

// 引入jsx文件
// import UseClientWidth from './clientWidth.jsx';
// const useClientWidth = UseClientWidth();

let form = reactive({
    username: '',
    password: ''
});

// 判断是否登录，登录了就给表单值
if (localStorage.getItem('vue_lol')) {
    form = reactive({
        username: '18384518552',
        password: '990223'
    })
}

const open = () => {
    form.username = '18384518552';
    form.password = '990223';

};
// 定义表单ref
const rulesRef: Ref = ref(null);

// 定义登录按钮状态
interface ILoading {
    delay: number
}
const iconLoading = ref<boolean | ILoading>(false);
const loginornot = ref('登录');

const onSubmit = (e: Event) => {
    rulesRef.value.validate(async (valid: any) => {
        console.log('表单验证通过');

        // 给标签添加属性
        iconLoading.value = { delay: 1000 };
        loginornot.value = '登录中...';
        setTimeout(() => {
            iconLoading.value = false;
            loginornot.value = '登录';
        }, 3000);

        if (valid) {
            // 前端不能直接判断，要给后端发送请求（mock），判断是否正确
            /* // if (form.username == '18384518552' && form.password == '990223') {
            //     localStorage.setItem('vue_lol', JSON.stringify(form));
            //     ElMessage.success('登录成功');
            //     const res = await login({ username: form.username, password: form.password });
 
            //     console.log(res);
            //     // 跳转到首页
            //     await nextTick();
            //     // window.open('https://www.douyu.com/42666', '_self');
 
            // } else {
            //     ElMessage.error('登录失败');
            //     console.log('登录失败');
            // } */
            setTimeout(async () => {
                const res = await login({ username: form.username, password: form.password });
                console.log('mock返回数据', res.data);
                if (res.data.code === 200) {
                    console.log(res.data.message);
                    // localStorage.setItem('vue_lol', JSON.stringify(form));
                    // 跳转到首页
                    router.push('/index');
                    // 成功后移除loading

                    // router.push('');
                    // router.replace('/');

                    // 用用全局状态管理
                    // Vue1.mutations.increment(Vue1.state, res.data.token);
                } else {
                    console.log(res.data.message);
                    return new Error('表单验证失败');
                }
            }, 2500)
        } else {
            return
        }
    });
};
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 11, max: 11, message: '用户名为18384518552', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur', },
        { min: 6, max: 6, message: '密码为990223', trigger: 'blur' }
    ]
});

const showLogin = ref(true);
const showElTooltip = ref(false);

onMounted(() => {
    const box: any = document.querySelector('.box');
    const mouseover = (e: Event) => {
        setTimeout(() => {
            document.querySelector('.el-card')?.removeEventListener('mouseover', mouseover);
            showElTooltip.value = true;
        }, 2500);
    }
    document.querySelector('.el-card')?.addEventListener('mouseover', mouseover);
    box.addEventListener('mousedown', (e: any) => {
        const ract: any = document.querySelector('.box')?.getBoundingClientRect();
        // 判断鼠标的位置在不在box的中间部分
        const disX = e.clientX - ract.left;
        const disY = e.clientY - ract.top;
        if (disX > 120 && disX < 550 && disY > 90 && disY < 170) {
            console.log('在中间');
            // 移除点击事件
            box.removeEventListener('mousedown', (e: any) => { });
            return;
        } else {
            console.log('不在中间');
        }
        // 鼠标到元素边距
        console.log(disX, disY);

        const move = (e: any) => {
            box.style.left = e.clientX - disX + 'px';
            box.style.top = e.clientY - disY + 'px';
            box.style.transform = 'none';
            box.style.marginTop = '0'
        }
        box.addEventListener('mousemove', move);

        box.addEventListener('mouseup', (e: any) => {
            box.removeEventListener('mousemove', move);
        });
        box.addEventListener('mouseleave', (e: any) => {
            box.removeEventListener('mousemove', move);
        });
    }, false);

    // // 进入视口自动播放视频
    // window.addEventListener('mouseover', () => {

    // });
})

// q: background-size: cover;是什么意思?
// a: 背景图像将被拉伸以填充元素的整个内容区域。如果图像的宽高比与元素的宽高比不同，那么图像将被拉伸并且看起来可能会失真。
</script>

<template>
    <button class="loginBtn" @click="showLogin = !showLogin">登录</button>
    <div class="content">
        <!-- <div class="bgi">
                                                    <img src="./../../assets/水调歌头.jpg" alt="">
                                               </div> -->
        <!-- <video id="v1" autoplay loop muted style="">
                                    <source src="./../../assets" type="video/mp4" />
                                </video> -->
        <el-tooltip class="elTooltip" content="拖拉" effect="light" placement="right" :disabled="showElTooltip">
            <div class="box" v-show="showLogin">
                <el-card style="{{  'left': rect.x; 'right':rect.y  }}" class="el-card" header="" v-show="showLogin"
                    @selectstart="($event: Event) => $event.preventDefault()">
                    <el-icon class="closeBold" @click="showLogin = false">
                        <CloseBold />
                    </el-icon>
                    <div>
                        <h3>登录吧
                            <img style="height: 50px;float: right;" src="./../../assets/@_Acgnz.svg" alt="">
                        </h3>
                    </div>
                    <el-form :model="form" label-width="120px" :rules="rules" ref="rulesRef">
                        <el-form-item label="用户名：" prop="username" label-width="80px">
                            <el-input v-model="form.username" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item label="密码：" prop="password" label-width="80px">
                            <el-input v-model="form.password" placeholder="请输入密码" show-password />
                        </el-form-item>
                        <el-button @click="open" style="opacity: 0.76;">注入</el-button>
                        <el-button size="medium" type="primary" @click="onSubmit" :loading-icon="Eleme" id="login"
                            :loading="iconLoading" style="margin-left: 37%;width: 50%;opacity: 0.76;">{{ loginornot
                            }}</el-button>
                        <!-- <a-button type="primary" :loading="iconLoading" @click="enterIconLoading">
                                    <template #icon>
                                        <PoweroffOutlined />
                                    </template>
                                    登录
                                </a-button> -->
                    </el-form>
                </el-card>
            </div>
        </el-tooltip>
    </div>
</template>

<style scoped lang="scss">
video {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
}

h3 {
    margin-bottom: 35px;
}

.content {
    width: 100%;
    height: 100%;
    background: url(./../../assets/穹.jpg) no-repeat;
    // q: background-size: cover;是什么意思?
    // a: 背景图像将被拉伸以填充元素的整个内容区域。如果图像的宽高比与元素的宽高比不同，那么图像将被拉伸并且看起来可能会失真。
    background-size: cover;
    background-color: rgba(137, 207, 235, 0.76);
    background-position-x: 50%;
}

.box {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    min-width: 550px;
    min-height: 300px;
    max-width: 550px;
    max-height: 300px;
    margin-top: 321px;
    // background-color: red;
    border: 0;
    border-radius: 10px;
    padding: 0 20px;
    font-size: 24px;
    // opacity: 0;
}

.el-card {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    min-width: 550px;
    min-height: 300px;
    max-width: 550px;
    max-height: 300px;
    // margin-top: 280px;
    background-color: rgba(137, 207, 235, 0.76);
    border: 0;
    padding: 0 20px;
    font-size: 24px;

    .el-card__header {
        border-bottom: 0px solid red;
    }
}

.closeBold {
    position: absolute;
    right: 9px;
    top: 9px;
    color: #fff;
    cursor: pointer;
}

.loginBtn {
    position: fixed;
    left: 20px;
    top: 20px;
    background-color: #ffff00;
    border: 0;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    opacity: 0;
    color: #ffc0cb;
}

.loginBtn:hover {
    opacity: 1;
    transition: 2.5s;
}

// .tooltip-base-box {
//   width: 600px;
// }
// .tooltip-base-box .row {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }
// .tooltip-base-box .center {
//   justify-content: center;
// }
// .tooltip-base-box .box-item {
//   width: 110px;
//   margin-top: 10px;
// }
</style>