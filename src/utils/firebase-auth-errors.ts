import { FirebaseError } from "@firebase/util";

export const mapAuthCodeToMessage = (e: FirebaseError) => {
    switch (e.code) {
      case "auth/invalid-password":
        return "Password provided is not correct";
      case "auth/invalid-email":
        return "Email provided is invalid";
      case "auth/email-already-in-use":
        return "Email already in use"
      case "auth/weak-password":
        return 'Password too weak'
      default:
        return "We are unable to log you in";
    }
}