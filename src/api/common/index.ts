import request from "../index";

export function getDict(types) {
    return request({
        url: "common/getDict",
        method: "get",
        params: {types},
    });
}

