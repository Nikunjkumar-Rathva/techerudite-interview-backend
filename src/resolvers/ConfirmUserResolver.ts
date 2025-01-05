import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { IStatusResponse } from "../types";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => IStatusResponse)
  async confirmUser(@Arg("userId") userId: number): Promise<IStatusResponse> {
    try {
      if (!userId) {
        return {
          data: "",
          msg: "UserId Not available",
          success: false,
        };
      }

      const isAlreadyVerified = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (isAlreadyVerified?.isConfirmed) {
        return {
          data: "",
          msg: "Already verified",
          success: true,
        };
      }

      await User.update(
        {
          id: userId,
        },
        {
          isConfirmed: true,
        }
      );

      return {
        data: "",
        msg: "You have successfully verified your account",
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
