
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  addAccount,
  updateAccount
} from "../features/accounts/accountSlice";

function AccountForm({ onClose, initialData }) {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      accountName: "",
      email: "",
      phone: "",
      website: "",
      industry: "",
      status: "",
      remark: ""
    }
  });

  // Load existing data when editing
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        accountName: "",
        email: "",
        phone: "",
        website: "",
        industry: "",
        status: "",
        remark: ""
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {

    if (initialData) {
      dispatch(updateAccount({
        ...data,
        id: initialData.id
      }));

      alert("Account updated successfully!");

    } else {
      dispatch(addAccount(data));

      alert("Account added successfully!");
    }

    reset();
    onClose();
  };

  return (
    <div className="card shadow-sm border-0 p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h4>
          {initialData ? "Edit Account" : "Add New Account"}
        </h4>

        <button
          type="button"
          className="btn-close"
          onClick={onClose}
        />

      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">Account Name *</label>

            <input
              className="form-control"
              placeholder="Enter account name"
              {...register("accountName", {
                required: "Account name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required"
                }
              })}
            />

            {errors.accountName && (
              <small className="text-danger">
                {errors.accountName.message}
              </small>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email *</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email"
                }
              })}
            />

            {errors.email && (
              <small className="text-danger">
                {errors.email.message}
              </small>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Phone Number *</label>

            <input
              type="tel"
              className="form-control"
              placeholder="10 digit phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10 digit number"
                }
              })}
            />

            {errors.phone && (
              <small className="text-danger">
                {errors.phone.message}
              </small>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Website *</label>

            <input
              className="form-control"
              placeholder="www.example.com"
              {...register("website", {
                required: "Website is required",
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i,
                  message: "Enter a valid website"
                }
              })}
            />

            {errors.website && (
              <small className="text-danger">
                {errors.website.message}
              </small>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Industry *</label>

            <select
              className="form-select"
              {...register("industry", {
                required: "Please select industry"
              })}
            >
              <option value="">Select Industry</option>
              <option value="IT Services">IT Services</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Marketing">Marketing</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </select>

            {errors.industry && (
              <small className="text-danger">
                {errors.industry.message}
              </small>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Account Status *</label>

            <select
              className="form-select"
              {...register("status", {
                required: "Please select status"
              })}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {errors.status && (
              <small className="text-danger">
                {errors.status.message}
              </small>
            )}
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Remark *</label>

            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter remark"
              {...register("remark", {
                required: "Remark is required"
              })}
            />

            {errors.remark && (
              <small className="text-danger">
                {errors.remark.message}
              </small>
            )}
          </div>

        </div>

        <div className="d-flex justify-content-end gap-2">

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            {initialData ? "Update Account" : "Save Account"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AccountForm;
