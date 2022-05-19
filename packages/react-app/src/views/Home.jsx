import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  // const purpose = useContractReader(readContracts, "YourContract", "purpose");
  const [newPurpose, setNewPurpose] = useState("loading...");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [add, setAdd] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [data, setData] = useState(null);

  console.log(name);
  console.log(email);

  return (
    <div style={{ padding: 32 }}>
      <h1>Home</h1>

      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ margin: 8 }}>
          <Input
            style={{ width: 400, margin: 16 }}
            placeholder={"Name"}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <Input
            style={{ width: 400, margin: 16 }}
            placeholder={"Email"}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <Input
            style={{ width: 400, margin: 16 }}
            placeholder={"Phone"}
            onChange={e => {
              setPhone(e.target.value);
            }}
          />
          <Input
            style={{ width: 400, margin: 16 }}
            placeholder={"Address"}
            onChange={e => {
              setAdd(e.target.value);
            }}
          />
          <Input
            style={{ width: 400, margin: 16 }}
            placeholder={"Age"}
            onChange={e => {
              setAge(e.target.value);
            }}
          />
          <Input
            style={{ width: 400, margin: 16 }}
            placeholder={"Blood Group"}
            onChange={e => {
              setBloodGroup(e.target.value);
            }}
          />
          <br />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(
                writeContracts.YourContract.addPatient(name, email, phone, age, bloodGroup, add),
                update => {
                  console.log("📡 Transaction Update:", update);
                  if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                      " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                  }
                },
              );
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Add Patient!
          </Button>
        </div>
        <Divider />
        <div style={{ margin: 8 }}>
          <Button
            onClick={async () => {
              const result = await readContracts["YourContract"].patients(address);
              setData(result);
              console.log(result);
            }}
          >
            Get Patient!
          </Button>
        </div>
        {data && data.name === "" ? (
          <h1>Please Generate your healthcard</h1>
        ) : (
          <div style={{ margin: 16 }}>
            <Card title={`${address}`}>
              <h1>{data?.name}</h1>
              <li>
                Blood Group: {data?.bloodgrp} &emsp;&emsp;&emsp; Age: {data?.age}
              </li>
              <li>
                Email: {data?.email} &emsp;&emsp;&emsp; Phone {data?.phone}
              </li>
              <li></li>
              <li>Address: {data?.add}</li>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
