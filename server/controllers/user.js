
import User from '../models/usersModel.js';
// export const getListCustomer = async (req, res) => {
//   try {
//     const { type } = req.params;
//     const list = await Customer.find({ type: type }).sort({
//       _id: -1,
//     });
//     res.status(200).json({ success: true, detail: list });
//   } catch (error) {
//     res.status(404).json({ success: false, message: error.message });
//   }
// };

export const loginUser = async (req, res) => {
    try {
        const { full_name, username } = req.body;
        if (!full_name || !username) {
            return res.status(404)
               .json({ success: false, message: "Vui lòng nhập đầy đủ họ tên!!" });
        } 
        const is_exist =await User.findOne({ username : username })
        if(is_exist) return res.status(201).json({ success: false, error: "Username đã tồn tại!" });

        const new_user = new User({ full_name, username });
        await new_user.save();
        return res.status(201).json({ success: true, detail: new_user });
    } catch (error) {
        res.status(409).json({ success: false, message: error.message });
    }
};