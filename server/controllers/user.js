
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
    const test = {
      full_name : 'Liem Nguyen',
      username : 'liemnguyen',
      phone_number : '0326347612'
    }
    const { full_name, phone_number, username} = test;
    if (!full_name || !username) {
      res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ họ tên!!" });
    } else {
      const new_user = new User({ full_name, phone_number, username});

      await new_user.save();

      res.status(201).json({ success: true, detail: new_user });
    }
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};