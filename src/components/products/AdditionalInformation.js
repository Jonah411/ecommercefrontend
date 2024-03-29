import React, { useEffect, useState } from "react";
import { useGetAttributesQuery } from "../../feature/profileReducer/authProfile";

const AdditionalInformation = ({ productDetails }) => {
  const [details, setDetails] = useState(productDetails);
  useEffect(() => {
    setDetails(productDetails);
  }, [productDetails]);

  const { data: attributesData } = useGetAttributesQuery(
    details?.simple_product?.attributes,
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  return (
    <div>
      <h5>Attribute Values</h5>
      <div className="table-responsive">
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {attributesData?.map((element, index) => {
              return (
                <>
                  {element?.visible && (
                    <tr>
                      <td>{element.attr_name}</td>
                      <td>{element?.attr_values?.join(",")}</td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdditionalInformation;
