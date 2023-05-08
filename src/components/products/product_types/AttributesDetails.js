import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import {
  useCreateAttributesMutation,
  useDeleteAttributesMutation,
  useGetAttributesQuery,
} from "../../../feature/profileReducer/authProfile";

const AttributesDetails = ({ handleChange, ProductValues, variantName }) => {
  const [createAttributes, { data, isSuccess, error, isError }] =
    useCreateAttributesMutation();
  const [
    deleteAttributes,
    {
      data: removeData,
      isSuccess: removeIsSuccess,
      error: removeError,
      isError: removeIsError,
    },
  ] = useDeleteAttributesMutation();
  const { data: attributesData } = useGetAttributesQuery(
    data ? data?.data?.attributes : ProductValues?.attributes,
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  const init = {
    attr_name: "",
    attr_values: "",
    visible: false,
    variations: false,
    index: 0,
  };
  const [attrForms, setAttrForms] = useState(init);
  const [attrFormsArray, setAttrFormsArray] = useState([]);
  const [attrIsSubmit, setAttrIsSubmit] = useState(false);
  const [attrError, setAttrError] = useState({});
  //const [addForm, setAddForm] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleAttrChange = (event) => {
    setAttrIsSubmit(false);
    const { name, value, checked } = event.target;
    if (name === "attr_values") {
      const inputText = value;
      const nameArray = inputText.split("|");
      const newdataArray = nameArray.map((element) => element.trim());

      setAttrForms({ ...attrForms, [name]: newdataArray });
    } else if (name === "visible") {
      setAttrForms({ ...attrForms, [name]: checked });
    } else if (name === "variations") {
      setAttrForms({ ...attrForms, [name]: checked });
    } else {
      setAttrForms({ ...attrForms, [name]: value });
    }
  };
  const handleAttrAdd = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleAttrClick = (e) => {
    e.preventDefault();

    setAttrError(validation(attrForms));
    setAttrIsSubmit(true);
  };
  const validation = (values) => {
    const errors = {};
    if (!values.attr_name) {
      errors.attr_name = "Attribute name is required";
    }
    if (!values.attr_values) {
      errors.attr_values = "Attribute value is required";
    }
    return errors;
  };
  const handleDelete = (index) => {
    setAttrFormsArray((prevState) => {
      const updatedArray = [...prevState];
      updatedArray.splice(index, 1);
      return updatedArray;
    });

    setAttrFormsArray((prevState) => {
      const updatedArray = prevState.map((item, idx) => {
        return { ...item, index: idx };
      });
      return updatedArray;
    });
  };
  useEffect(() => {
    if (Object.keys(attrError && attrError).length === 0 && attrIsSubmit) {
      if (attributesData && attrIsSubmit) {
        const patch = {
          simpleId: ProductValues?.simpleId,
          data: attrForms,
        };
        createAttributes(patch);
      }
      setAttrFormsArray((prevState) => [
        ...prevState,
        { ...attrForms, index: prevState.length },
      ]);
      setAttrForms((prevState) => ({
        ...prevState,
        index: prevState.index + 1,
      }));

      setAttrIsSubmit(false);
      setShow(false);
    }
  }, [
    attrError,
    attrIsSubmit,
    attrForms,
    ProductValues,
    attributesData,
    createAttributes,
  ]);
  // const ListAttributes = [
  //   ...(Array.isArray(attributesData) ? attributesData : []),
  //   ...attrFormsArray,
  // ];

  const columns = [
    {
      name: "Name",
      selector: (row) => row.attr_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Value",
      selector: (row) => row.attr_values?.join(","),
      sortable: true,
      wrap: true,
    },
    {
      name: "Visible",
      selector: (row) => (row.visible ? "true" : "false"),
      sortable: true,
      wrap: true,
    },
    variantName === "Variable Product" && {
      name: "Variations",
      selector: (row) => (row.variations ? "true" : "false"),
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-danger"
            onClick={() => {
              handleDelete(row?.index);
              if (attributesData) {
                deleteAttributes(row?._id);
              }
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const data = {
      target: {
        name: "attributes",
        value: attrFormsArray,
      },
    };
    handleChange(data);
  };
  useEffect(() => {
    if (isSuccess || removeIsSuccess) {
      if (data?.status || removeData?.status === true) {
        toast.success(`${data?.msg || removeData?.msg}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (removeIsSuccess) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        if (isError || removeIsError) {
          toast.error(`${error?.data?.msg || removeError?.data?.msg}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } else {
      if (isError || removeIsError) {
        toast.error(`${error?.data?.msg || removeError?.data?.msg}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [
    isSuccess,
    data,
    isError,
    error,
    removeError,
    removeIsError,
    removeIsSuccess,
    removeData,
  ]);
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
      <DataTable
        className="data-table-store"
        title={<p className="m-0">Custom Attributes List</p>}
        columns={columns}
        data={attributesData ? attributesData : attrFormsArray}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
      />
      <hr />
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={(e) => handleSaveChanges(e)}
        >
          Save Changes
        </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Custom Attributes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
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
                    onChange={(e) => handleAttrChange(e)}
                  />
                </FloatingLabel>
                <p className="text-danger">{attrError?.attr_name}</p>
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
                    onChange={(e) => handleAttrChange(e)}
                  />
                  <p className="m-0 text-muted">
                    Enter some text or some attributes by '|' separating values.
                  </p>
                  <p className="text-danger">{attrError?.attr_values}</p>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col md>
                <Form.Check
                  type={"checkbox"}
                  label={`Visible on the product page`}
                  name="visible"
                  onChange={(e) => handleAttrChange(e)}
                  value={attrForms?.visible}
                />
              </Col>
              {variantName === "Variable Product" && (
                <Col md>
                  <Form.Check
                    type={"checkbox"}
                    label={`Used for variations`}
                    name="variations"
                    onChange={(e) => handleAttrChange(e)}
                    value={attrForms?.visible}
                  />
                </Col>
              )}
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleAttrClick(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AttributesDetails;
