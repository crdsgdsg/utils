import request from "../index";

export function addRegular(data) {
    return request({
        url: "jsonProduce/addRegular",
        method: "post",
        data,
    });
}

export function addJsonTemplate(data) {
    return request({
        url: "jsonProduce/addJsonTemplate",
        method: "post",
        data,
    });
}

export function getAllJsonTemplate() {
    return request({
        url: "jsonProduce/getAllJsonTemplate",
        method: "post"
    });
}

export function findJsonTemplateById(id) {
    return request({
        url: "jsonProduce/findJsonTemplateById",
        method: "post",
        params:{id}
    });
}

