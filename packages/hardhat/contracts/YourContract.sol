pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {
    struct Patient {
        string name;
        string email;
        string phone;
        string age;
        string bloodgrp;
        string add;
    }

    mapping(address => Patient) public patients;

    function addPatient(
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _age,
        string memory _bloodgrp,
        string memory _add
    ) public {
        Patient memory patient;
        patient.name = _name;
        patient.email = _email;
        patient.phone = _phone;
        patient.age = _age;
        patient.bloodgrp = _bloodgrp;
        patient.add = _add;
        patients[msg.sender] = patient;
    }

    // function getPatient()
    //     public
    //     view
    //     returns (
    //         string memory,
    //         string memory,
    //         string memory,
    //         string memory,
    //         string memory,
    //         string memory
    //     )
    // {
    //     Patient storage patient = patients[msg.sender];
    //     return (
    //         patient.name,
    //         patient.email,
    //         patient.phone,
    //         patient.age,
    //         patient.bloodgrp,
    //         patient.add
    //     );
    // }
}
