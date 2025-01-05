import * as bcrypt from "bcrypt";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ICreateUser, User } from "../entity/User";
import { IStatusResponse } from "../types";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
import { sendEmail } from "../utils/sendEmail";

@Resolver()
export class UserResolver {
  @Mutation(() => IStatusResponse)
  async createUser(
    @Arg("data") options: ICreateUser
  ): Promise<IStatusResponse> {
    try {
      const { email, firstName, lastName, password, isAdmin, isCustomer } =
        options;

      const isExist = await User.findOne({
        where: {
          email: email,
        },
      });

      if (isExist) {
        return {
          data: "",
          msg: "This email is already exist",
          success: false,
        };
      }

      const hash = await bcrypt.hash(password, 12);

      const newUser = new User();

      newUser.email = email;
      newUser.password = hash;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.isAdmin = isAdmin;
      newUser.isCustomer = isCustomer;

      await newUser.save();

      await sendEmail(email, createConfirmationUrl(newUser.id));

      return {
        data: "",
        msg: "We have sent account verification link to your email address",
        success: true,
      };
    } catch (err) {
      console.log(err);

      return {
        data: "",
        msg: "Something went wrong on a server",
        success: false,
      };
    }
  }
}
