import request from "@/utils/request";

export function getMenuList() {
    return request({
        url: "/menu",
        method: "get",
    });
}