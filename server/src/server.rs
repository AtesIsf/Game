
use std::{net::{TcpListener, TcpStream}, thread::JoinHandle};

use log::*;

use crate::clientmanagement::Client;


pub struct Server {
    p1: Client,
    p2: Client,
}

impl Server {
    pub fn new() -> Self {
        Self { p1: Client::new(1), p2: Client::new(2) }
    }

    pub fn run(&self) {
        todo!()
    }

    pub fn handle_stream(&self, s: &TcpStream) {
        todo!()
    }
}

