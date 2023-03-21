# 需求

## 网速

## 拖拽

```tsx
const rect = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    center: {
        x: 0,
        y: 0
    }
});

// 定义鼠标在视口上的位置
const mousePosition = reactive({
    x: 0,
    y: 0
});

const mouseover = (e: Event) => {
    console.log('进入', e);
    setTimeout(() => {
        document.querySelector('.el-card')?.removeEventListener('mouseover', mouseover);
        showElTooltip.value = true;
    }, 2500);
}
onMounted(() => {
    document.querySelector('.el-card')?.addEventListener('mouseover', mouseover);
    window.addEventListener('mousemove', (event) => {
        mousePosition.x = event.clientX;
        mousePosition.y = event.clientY;    
        console.log(mousePosition);
    });
})

/* 拖拉 */
const mousedown = (e: Event) => {
    console.log('按下', e);
    document.querySelector('.el-card')?.addEventListener('mousemove', mousemove);
    const res = document.querySelector('.el-card')?.getBoundingClientRect() as DOMRect;    
    console.log(res);
    rect.x = res.x;
    rect.y = res.y;
    // 命中检测
    if (mousePosition.x > rect.x && mousePosition.x < rect.x + res.width && mousePosition.y > rect.y && mousePosition.y < rect.y + res.height) {
        console.log('命中');
        // 鼠标在元素内部的位置计算
        rect.center.x = mousePosition.x - rect.x;
        rect.center.y = mousePosition.y - rect.y;
    }
}
const mousemove = (e: Event) => {
    console.log('移动', e);
}
const mouseup = (e: Event) => {
    console.log('抬起', e);
    document.querySelector('.el-card')?.removeEventListener('mousemove', mousemove);
}
const mouseleave = (e: Event) => {
    console.log('离开', e);
    document.querySelector('.el-card')?.removeEventListener('mousemove', mousemove);
    document.querySelector('.el-card')?.removeEventListener('mouseover', mouseover);
}

// 到这里,获取到了鼠标在视口的坐标(mousePosition),鼠标在元素里面的坐标(rect.center),元素到视口左上角的坐标(rect)
// 改进
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
})
```
