// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud2-0g1qpznn8481602d'
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    /**检测参数是否传递  start */
    if (event.taskId == undefined) {
        //返回执行结果
        var result = {}
        result.errCode = 1
        result.errMsg = '未传必要参数，请重试'

        var data = {}
        result.data = data
        return result
    }
    /**检测参数是否传递  end */

    //实例化数据库
    const db = cloud.database()

    /**根据前端传递的任务id获取任务详情 start */
    var tasks
    await db.collection('CurrentTask')
        .where({
            taskId: db.command.in(event.taskId)
        })
        .get()
        .then(res => {
            console.log('获取任务信息成功')
            console.log(res)
            tasks=res.data
        })
    /**根据前端传递的任务id获取任务详情 end */

    //返回执行结果
    var result = {}
    result.errCode = 0
    result.errMsg = '获取成功'
    var data = {}
    data.tasks = tasks
    result.data = data
    return result
}