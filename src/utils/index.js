import { nanoid } from "nanoid"

export function convertMessagesList(list){
    let new_list = [],
        user_group = { key : null ,info: null, messages: [] }
    list.map((item, index) => {
        if (user_group.info === item.sender) {
            user_group.messages.push(item)
        } else {
            user_group.info && new_list.push(user_group)
            user_group = {  key : nanoid() , info: item.sender, messages: [item] }
        }
        if (index === list.length - 1 && user_group.info) new_list.push(user_group)
        
    })
    return new_list
}
