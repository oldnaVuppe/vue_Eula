import request from "@/utils/request";

export const getMenuList = function() {
    return request({
        url: "/menu",
        method: "get",
    });
};