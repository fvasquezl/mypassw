import { connect } from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/model/User";

//* for DB connection
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(registerSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    //* Check if email already exists
    const user = await User.findOne({ email: output.email });
    if (user) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Email is already in taken, please use an other email.",
          },
        },
        { status: 200 }
      );
    } else {
      //* encript the password
      const salt = bcrypt.genSaltSync(10);
      output.password = bcrypt.hashSync(output.password, salt);
      await User.create(output);
      return NextResponse.json(
        {
          status: 200,
          message: "Account created successfully, please login your account",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}
