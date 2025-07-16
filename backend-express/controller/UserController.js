// import express
const express = require('express');

// import prisma client
const prisma = require('../prisma/client');

// function findUser
const findUser = async (req, res) =>{
    try{

        // get all user from database
        const users = await prisma.user.findMany({
            select:{
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: 'desc',
            },
        })

        // send response
        res.status(200).send({
            success: true,
            message: 'Get all users successfully',
            data: users,
        });

    }catch (error) {
        // jika terjadi error, kembalikan error ke pengguna
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}
module.exports = { findUser };