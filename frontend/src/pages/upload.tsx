import axios from "axios";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useSignS3Mutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { formatFileName } from "../utils/formatFileName";

const Upload = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [, signS3] = useSignS3Mutation();

  const onDrop = async (files: any) => {
    setFile(files[0]);
  };

  const onChange = (e: any) => {
    setName(e.target.value);
  };

  const uploadToS3 = async (file: any, signedRequest: any) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };

  const submit = async () => {
    const response = await signS3({
      filename: formatFileName(file.name),
      filetype: file.type,
    });

    const { signedRequest, url } = response.data.signS3;
    console.log("signedRequest", signedRequest);
    console.log("url", url);
    await uploadToS3(file, signedRequest);

    // SALVAR NA DB

    // const graphqlResponse = await this.props.createChampion({
    //   variables: {
    //     name,
    //     pictureUrl: url,
    //   },
    // });
  };

  return (
    <div style={{ backgroundColor: "#fff", width: "100%", height: "100vh" }}>
      <input name="name" onChange={onChange} value={name} />
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Upload);
