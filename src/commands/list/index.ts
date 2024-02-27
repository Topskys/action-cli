import { getTemplates } from "@/api"

/**
 * list命令处理函数
 */
export default async () => {
    const templates: any = await getTemplates();
    console.log(templates);
    for(let key in templates){
        console.log(`${key}`);
    }
}