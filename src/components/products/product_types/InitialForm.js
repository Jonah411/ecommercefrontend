import React, { useEffect, useState } from "react";
import { useRef } from "react";
import JoditEditor from "jodit-react";

const InitialForm = ({ handleChange, formValues }) => {
  const [formValue, setFormValue] = useState(formValues);
  useEffect(() => {
    if (formValues) {
      setFormValue(formValues);
    }
  }, [formValues]);
  const editor = useRef(null);
  return (
    <div>
      <div className="mb-3">
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formValue?.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Description</label>
            <JoditEditor
              ref={editor}
              value={formValue?.description}
              tabIndex={1}
              onChange={(e) => {
                let data = {
                  target: {
                    name: "description",
                    value: e,
                  },
                };
                handleChange(data);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formValue?.email}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InitialForm;
