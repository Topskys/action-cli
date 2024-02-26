export const baseUrl = 'https://api.example.com'

const service = (url: string | URL | Request, options?: RequestInit): Promise<Response> => {
    return fetch(baseUrl + url, options).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 将响应数据解析为JSON格式
    }).catch(error => {
        // 处理请求过程中的错误
        console.error('Fetch请求出现问题:', error);
    });
}

/**
 * 获取模板
 */
export const getTemplates = () => service('/data');


export default service;