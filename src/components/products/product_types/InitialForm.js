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
              //config={config}
              tabIndex={1} // tabIndex of textarea
              //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
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
        </form>
      </div>
    </div>
  );
};

export default InitialForm;
