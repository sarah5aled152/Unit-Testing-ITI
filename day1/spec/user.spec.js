const User = require("../user");

describe("User Class", () => {
  let user;
  let paymentModel;

  beforeEach(() => {
    user = new User("John", "password123");
    // Create payment model with spy methods
    paymentModel = {
      goToVerifyPage: jasmine.createSpy("goToVerifyPage"),
      returnBack: jasmine.createSpy("returnBack"),
      isVerify: jasmine.createSpy("isVerify"),
    };
  });

  describe("checkout Method", () => {
    it("should call all payment model methods in correct order", () => {
      // Setup isVerify to return true
      paymentModel.isVerify.and.returnValue(true);

      user.checkout(paymentModel);

      // Verify methods were called
      expect(paymentModel.goToVerifyPage).toHaveBeenCalled();
      expect(paymentModel.returnBack).toHaveBeenCalled();
      expect(paymentModel.isVerify).toHaveBeenCalled();

      // Verify order of calls
      expect(paymentModel.goToVerifyPage).toHaveBeenCalledBefore(
        paymentModel.returnBack
      );
      expect(paymentModel.returnBack).toHaveBeenCalledBefore(
        paymentModel.isVerify
      );
    });

    it("should return true when payment is verified", () => {
      paymentModel.isVerify.and.returnValue(true);

      const result = user.checkout(paymentModel);

      expect(result).toBe(true);
    });

    it("should return false when payment is not verified", () => {
      paymentModel.isVerify.and.returnValue(false);

      const result = user.checkout(paymentModel);

      expect(result).toBe(false);
    });
  });
});
