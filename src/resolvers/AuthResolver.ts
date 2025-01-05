import * as bcrypt from "bcrypt";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { IStatusResponse } from "../types";

@InputType()
export class IAuthUser {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => IStatusResponse)
  async authAdminUser(
    @Arg("data") options: IAuthUser
  ): Promise<IStatusResponse> {
    const { email, password } = options;

    const isUserExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!isUserExist) {
      return {
        data: "",
        msg: "User not found",
        success: false,
      };
    }

    const valid = await bcrypt.compare(password, isUserExist?.password);

    if (isUserExist.isCustomer) {
      return {
        data: "",
        msg: "You are not allowed to login from here",
        success: false,
      };
    }

    if (!valid) {
      return {
        data: "",
        msg: "Invalid Password",
        success: false,
      };
    }

    return {
      data: "",
      msg: "Auth Successfull",
      success: true,
    };
  }

  @Mutation(() => IStatusResponse)
  async authCustomerUser(
    @Arg("data") options: IAuthUser
  ): Promise<IStatusResponse> {
    const { email, password } = options;

    const isUserExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!isUserExist) {
      return {
        data: "",
        msg: "User not found",
        success: false,
      };
    }

    const valid = await bcrypt.compare(password, isUserExist?.password);

    if (isUserExist.isAdmin) {
      return {
        data: "",
        msg: "You are not allowed to login from here",
        success: false,
      };
    }

    if (!valid) {
      return {
        data: "",
        msg: "Invalid Password",
        success: false,
      };
    }

    return {
      data: "",
      msg: "Auth Successfull",
      success: true,
    };
  }
}
