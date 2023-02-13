const router = require("express").Router();
const Schedule = require("../models/Schedule");

// Criação de dados
router.post("/", async (req, res) => {
  const { local, date, city, state, address, mapsInfo, hour } = req.body;
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) {
    res
      .status(422)
      .json({ error: "A data deve ser YYYY-MM-DD. Exemplo 2023-12-31" });
    return;
  }

  const dateMongo = new Date(`${date}T23:59:59.468Z`);

  const splitDate = date.split("-");
  const schedule = {
    date: dateMongo,
    dateBr: `${splitDate[2]}/${splitDate[1]}`,
    local,
    mapsInfo: mapsInfo ? mapsInfo : "",
    city: city ? city : "",
    state: state ? state : "",
    address: address ? address : "",
    hour: hour ? hour : "",
  };

  try {
    await Schedule.create(schedule);

    res.status(201).json({ msg: "Data inserida com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Leitura de dados
router.get("/", async (req, res) => {
  const currentDate = new Date();
  try {
    const schedule = await Schedule.find({ date: { $gt: currentDate } });

    res.status(200).json(schedule);
  } catch (error) {
    res.status.apply(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const schedule = await Schedule.findOne({ _id: id });

    if (!schedule) {
      res.status(422).json({ message: "Usuário não encontrado." });
      return;
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status.apply(500).json({ error: error });
  }
});

// Update de dados
// router.patch("/:id", async (req, res) => {
//   const id = req.params.id;

//   const { name, salary, approved } = req.body;

//   const schedule = {
//     name,
//     salary,
//     approved,
//   };

//   try {
//     const updateSchedule = await Schedule.updateOne({ _id: id }, schedule);

//     if (updateSchedule.matchedCount === 0) {
//       res.status(422).json({ message: "Usuário não encontrado." });
//       return;
//     }
//     res.status(200).json(schedule);
//   } catch (error) {
//     res.status.apply(500).json({ error: error });
//   }
// });

//Delete

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const schedule = await Schedule.findOne({ _id: id });
  if (!schedule) {
    res.status(422).json({ message: "Usuário não encontrado." });
    return;
  }
  try {
    await Schedule.deleteOne({ _id: id });
    res.status(200).json({ msg: "Usuário deletado" });
  } catch (error) {
    res.status.apply(500).json({ error: error });
  }
});

module.exports = router;
