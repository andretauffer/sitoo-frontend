import React, { useState } from "react";

export default Component => {
  const Fetcher = ({ ...props }) => {
    const [loading, setLoading] = useState(true);
    let data = {};
    const authorization =
      "Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM=";

    const fetcher = async ({
      path = "http://localhost:8088/",
      method = "GET",
      object
    }) => {
      await fetch(path, {
        method,
        body: JSON.stringify(object),
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(result => result.json())
        .then(res => {
          data = res;
          setLoading(false);
        });
      return data;
    };

    return (
      <Component fetcher={fetcher} data={data} loading={loading} {...props} />
    );
  };

  return Fetcher;
};
