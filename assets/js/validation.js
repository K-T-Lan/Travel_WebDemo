/**
 * VietWander - Form Validation Library
 * Handles client-side form validation for contact, booking, planner, and newsletter forms
 */

const Validation = {
  // Regex patterns
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,

  /**
   * Validate email address
   */
  isValidEmail(email) {
    if (!email) return false;
    return this.EMAIL_REGEX.test(email.trim());
  },

  /**
   * Validate Vietnamese phone number
   */
  isValidPhone(phone) {
    if (!phone) return false;
    const cleanPhone = phone.replace(/[\s.-]/g, '');
    return this.PHONE_REGEX.test(cleanPhone);
  },

  /**
   * Check non-empty string
   */
  isNotEmpty(value) {
    return value !== null && value !== undefined && value.trim().length > 0;
  },

  /**
   * Validate minimum string length
   */
  hasMinLength(value, min = 3) {
    return this.isNotEmpty(value) && value.trim().length >= min;
  },

  /**
   * Validate date range (start <= end)
   */
  isValidDateRange(startDateStr, endDateStr) {
    if (!startDateStr || !endDateStr) return false;
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    return !isNaN(start.getTime()) && !isNaN(end.getTime()) && start <= end;
  },

  /**
   * Attach live validation to form controls
   */
  markField(inputElement, isValid, errorMsg = '') {
    if (!inputElement) return;
    const parent = inputElement.closest('.form-group') || inputElement.parentElement;
    let feedback = parent.querySelector('.invalid-feedback-custom');

    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback-custom';
      parent.appendChild(feedback);
    }

    if (isValid) {
      inputElement.classList.remove('is-invalid');
      inputElement.classList.add('is-valid');
      feedback.textContent = '';
      feedback.style.display = 'none';
    } else {
      inputElement.classList.remove('is-valid');
      inputElement.classList.add('is-invalid');
      feedback.textContent = errorMsg;
      feedback.style.display = 'block';
    }
  },

  /**
   * Validate entire form based on schema
   */
  validate(formElement, schema) {
    let isAllValid = true;

    for (const [fieldName, rules] of Object.entries(schema)) {
      const field = formElement.querySelector(`[name="${fieldName}"]`);
      if (!field) continue;

      const val = field.value || '';
      let fieldValid = true;
      let errorMsg = '';

      if (rules.required && !this.isNotEmpty(val)) {
        fieldValid = false;
        errorMsg = rules.messages?.required || 'Vui lòng điền thông tin này';
      } else if (rules.email && !this.isValidEmail(val)) {
        fieldValid = false;
        errorMsg = rules.messages?.email || 'Email không hợp lệ (ví dụ: ten@gmail.com)';
      } else if (rules.phone && !this.isValidPhone(val)) {
        fieldValid = false;
        errorMsg = rules.messages?.phone || 'Số điện thoại Việt Nam không hợp lệ (10 số)';
      } else if (rules.minLength && !this.hasMinLength(val, rules.minLength)) {
        fieldValid = false;
        errorMsg = rules.messages?.minLength || `Tối thiểu ${rules.minLength} ký tự`;
      }

      this.markField(field, fieldValid, errorMsg);
      if (!fieldValid) isAllValid = false;
    }

    return isAllValid;
  }
};

// Export to window for vanilla script compatibility
if (typeof window !== 'undefined') {
  window.Validation = Validation;
}
