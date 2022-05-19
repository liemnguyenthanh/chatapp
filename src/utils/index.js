import { nanoid } from "nanoid"

export const createMessage = (message , userList) => {
    const { message : mes, room_id, sender, _id , clientMid } = message
    // 1  -> đang gửi 
    // 2  -> đã gửi -> New_message
    // 3  -> đã nhận  -> New_message && online
    // 4  -> đang xem -> New_message && online && trong room
    let status = _id ? 2 : clientMid ? 1  : 0   
    return {
        message : mes,
        room_id ,
        sender ,
        _id ,
        status 
    }
}
export function convertMessagesList(list , userList) {
    let new_list = [],
        user_group = { key: null, info: null, messages: [] }
        
    list.map((item, index) => {
        let new_item = createMessage(item , userList)
        if (user_group.info === new_item.sender) {
            user_group.messages.push(new_item)
        } else {
            user_group.info && new_list.push(user_group)
            user_group = { key: nanoid(), info: new_item.sender, messages: [new_item] }
        }
        if (index === list.length - 1 && user_group.info) new_list.push(user_group)

    })
    return new_list
}



export function contrast(rgb1, rgb2) {
    function luminance(r, g, b) {
        let a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    let lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    let lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    let brightest = Math.max(lum1, lum2);
    let darkest = Math.min(lum1, lum2);
    return (brightest + 0.05)
        / (darkest + 0.05);
}

export function rgbToHex(r, g, b) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
