import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [// ...
        vue()],
    resolve: {
        //使用@路径
        alias: {
            "@": path.resolve("./src")
        }
    },
    server: {
        proxy: {
            '/utils': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
                target: 'http://127.0.0.1:8080', // 目标地址 --> 服务器地址
                changeOrigin: true, // 允许跨域
                ws: true,  // 允许websocket代理
                // 重写路径 --> 作用与vue配置pathRewrite作用相同
                // rewrite: (path) => path.replace(/^\/api/, "")
            }
        },
    },
})
