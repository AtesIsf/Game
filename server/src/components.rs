
// All units and towers will implement this
pub trait Entity {
    fn move_order(&self, coords: (u16, u16)) -> bool;
    fn attack_order(&self, coords: (u16, u16)) -> bool;
}

pub struct EntityData {
    coords: (u16, u16),
    vis_range: u8,
    health: u16,
    stationary: bool,
}

impl Entity for EntityData {
    fn move_order(&self, coords: (u16, u16)) -> bool {
        if self.health <= 0 || self.stationary {
            return false;
        }
        todo!()
    }

    fn attack_order(&self, coords: (u16, u16)) -> bool {
        todo!()
    }
}

