const Appoitment = require("../models/Appoitment");

const getAppoitments = async (req, res) => {
  const appoitmens = await Appoitment.find().populate("user", "name");

  res.json({
    ok: true,
    appoitmens,
  });
};

const createAppoitment = async (req, res) => {
  try {
    const appoitment = new Appoitment(req.body);
    appoitment.user = req.uid;
    const appoitmentCreated = await appoitment.save();

    res.json({
      ok: true,
      appoitmentCreated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo ha salido mal",
    });
  }
};

const updateAppoitment = async (req, res) => {
    try {
        const appoitmentId = req.params.id

        const appoitment = await Appoitment.findById(appoitmentId)

        if(!appoitment){
            return res.status(404).json({
                ok: false,
                msg: 'No existe ninguna cita con ese ID'
            })
        }

        if(appoitment.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar esta cita'
            })
        }

        const newAppoitment = {
            ...req.body,
            user: req.uid
        }

        const appoitmentUpdated = await Appoitment.findByIdAndUpdate(appoitmentId, newAppoitment, {new: true})

        res.json({
            ok: true,
            appoitmentUpdated
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo ha salido mal'
        })
    }
};

const deleteAppoitment = async (req, res) => {
  try {
    const appoitmentId = req.params.id

    const appoitment = await Appoitment.findById(appoitmentId)

    if(!appoitment){
        return res.status(404).json({
            ok: false,
            msg: 'No existe ninguna cita con ese ID'
        })
    }

    if(appoitment.user.toString() !== req.uid){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegios para editar esta cita'
        })
    }

    const appoitmentDeleted = await Appoitment.findByIdAndDelete(appoitmentId)

    res.status(200).json({
        ok: true,
        deleted: appoitmentDeleted
    })

    
} catch (error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg: 'Algo ha salido mal'
    })
}
};

module.exports = {
  getAppoitments,
  createAppoitment,
  updateAppoitment,
  deleteAppoitment,
};
