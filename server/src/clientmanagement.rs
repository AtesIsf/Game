
pub struct Client {
    pub id: u32,
    pub online: bool,
}

impl Client {
    pub fn new(id: u32) -> Self {
        Self { id, online: false }
    } 

}

