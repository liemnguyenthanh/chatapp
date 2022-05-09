import { nanoid } from "nanoid"

export const convertMessagesList = (list) => {
    let new_list = [],
        user_group = { key : null ,image: null, messages: [] }
    list.map((item, index) => {
        if (user_group.image === item.sender) {
            user_group.messages.push(item)
        } else {
            user_group.image && new_list.push(user_group)
            user_group = {  key : nanoid() , image: item.sender, messages: [item] }
        }
        if (index === list.length - 1 && user_group.image) new_list.push(user_group)
    })
    return new_list
}
