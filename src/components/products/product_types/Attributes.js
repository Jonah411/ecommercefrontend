import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Attributes = ({ handleChange }) => {
  const init = [
    {
      attr_name: "",
      attr_values: "",
      visible: false,
    },
  ];
  const [attrForms, setAttrForms] = useState(init);
  const [attrIsSubmit, setAttrIsSubmit] = useState(false);
  const [attrError, setAttrError] = useState([]);
  //const [addForm, setAddForm] = useState(false);

  const handleAttrChange = (index, event) => {
    setAttrIsSubmit(false);
    const { name, value, checked } = event.target;
    if (name === "attr_values") {
      const inputText = value;
      const nameArray = inputText.split("|");
      const newdataArray = nameArray.map((element) => element.trim());
      const list = [...attrForms];
      list[index][name] = newdataArray;
      setAttrForms(list);
    } else if (name === "visible") {
      const list = [...attrForms];
      list[index][name] = checked;
      setAttrForms(list);
    } else {
      const list = [...attrForms];
      list[index][name] = value;
      setAttrForms(list);
    }
  };
  const handleAttrAdd = (e) => {
    e.preventDefault();
    setAttrForms([...attrForms, { attr_name: "", attr_values: "" }]);
  };
  const handleAttrClick = (e) => {
    e.preventDefault();

    setAttrError(validation(attrForms));
    setAttrIsSubmit(true);
  };
  const validation = (values) => {
    const errors = {};
    values.forEach((data, index) => {
      if (!data.attr_name) {
        errors[`attr_name_${index}`] = "Attribute name is required";
      }
      if (!data.attr_values) {
        errors[`attr_values_${index}`] = "Attribute value is required";
      }
    });
    return errors;
  };
  const removeForm = (index) => {
    const newList = [...attrForms];
    newList.splice(index, 1);
    setAttrForms(newList);
  };

  useEffect(() => {
    if (Object.keys(attrError).length === 0 && attrIsSubmit) {
      const data = {
        target: {
          name: "attributes",
          value: attrForms,
        },
      };
      console.log(data);
      handleChange(data);
      setAttrIsSubmit(false);
    }
  }, [attrError, attrIsSubmit, attrForms, handleChange]);

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary mb-3"
          onClick={(e) => handleAttrAdd(e)}
        >
          Add
        </button>
      </div>

      {attrForms.map((form, index) => (
        <div key={index} className="mb-2">
          <Row className="g-2">
            <Col md className="">
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Attributes Name"
              >
                <Form.Control
                  type="text"
                  placeholder="Attributes Name"
                  name="attr_name"
                  onChange={(e) => handleAttrChange(index, e)}
                />
              </FloatingLabel>
              {attrError && attrError[`attr_name_${index}`] && (
                <p className="text-danger">{attrError[`attr_name_${index}`]}</p>
              )}
            </Col>
            <Col md className="">
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Attributes Values"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter some text or some attributes by '|' separating values."
                  name="attr_values"
                  onChange={(e) => handleAttrChange(index, e)}
                />
                <p className="m-0 text-muted">
                  Enter some text or some attributes by '|' separating values.
                </p>
                {attrError && attrError[`attr_values_${index}`] && (
                  <p className="text-danger">
                    {attrError[`attr_values_${index}`]}
                  </p>
                )}
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col md>
              <Form.Check
                type={"checkbox"}
                label={`Visible on the product page`}
                name="visible"
                onChange={(e) => handleAttrChange(index, e)}
                value={form?.visible}
              />
            </Col>
            <Col md>
              <button
                onClick={() => removeForm(index)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </Col>
          </Row>
        </div>
      ))}
      <hr />
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={(e) => handleAttrClick(e)}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Attributes;
