// import express from "express";
// import marks2 from "../models/marks2.js";
// import Panel from "../models/Panel.js";
// import Team from "../models/Team.js";
// import verifyToken from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Get Assigned Teams
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const mentorId = req.user.id;
//     const panel = await Panel.findOne({ teacher_ids: mentorId });
//     if (!panel) {
//       return res.status(404).json({ message: "No panel found for this mentor." });
//     }
//     const teamIds = panel.team_ids;
//     const teams = await Team.find({ _id: { $in: teamIds } });
//     res.status(200).json({ teams });
//   } catch (error) {
//     console.error("Error fetching assigned teams:", error);
//     res.status(500).json({ message: "Failed to fetch assigned teams" });
//   }
// });

// // Submit Evaluation 1
// router.post("/submit-eval1", verifyToken, async (req, res) => {
//   const { rollNo, teamId, evalMarks1 } = req.body;
//   const evaluatedBy = req.user.id;
// // Validate required fields
// if (!rollNo || !teamId || evalMarks1 === undefined) {
//   return res.status(400).json({ message: "All fields are required." });
// }

// // Check evalMarks1 range
// if (evalMarks1 < 0 || evalMarks1 > 100) {
//   return res.status(400).json({ message: "EvalMarks1 must be between 0 and 100." });
// }
//   try {
//      // Check for duplicate
//      const existingRecord = await marks2.findOne({ rollNo });
//      if (existingRecord) {
//        return res.status(400).json({ message: "Evaluation 1 already submitted for this roll number." });
//      }
//     const newMarks = new marks2({
//       rollNo,
//       teamId,
//       evalMarks1,
//       evaluatedBy,
//     });
//     await newMarks.save();
//     res.status(201).json({ message: "Evaluation 1 submitted successfully." });
//   } catch (error) {
//     console.error("Error submitting Evaluation 1:", error);
//     res.status(500).json({ message: "Failed to submit Evaluation 1" });
//   }
// });

// // Submit Evaluation 2
// router.post("/submit-eval2", verifyToken, async (req, res) => {
//   const { rollNo, evalMarks2 } = req.body;
// // Validate required fields
// if (!rollNo || evalMarks2 === undefined) {
//   return res.status(400).json({ message: "Roll number and EvalMarks2 are required." });
// }

// // Check evalMarks2 range
// if (evalMarks2 < 0 || evalMarks2 > 100) {
//   return res.status(400).json({ message: "EvalMarks2 must be between 0 and 100." });
// }
//   try {
//     const existingRecord = await marks2.findOne({ rollNo });
//     if (!existingRecord) {
//       return res.status(400).json({ message: "Submit Evaluation 1 first." });
//     }
//  // Check if EvalMarks2 is already submitted
//  if (existingRecord.evalMarks2 !== undefined) {
//   return res.status(400).json({ message: "Evaluation 2 already submitted for this roll number." });
// }
//     existingRecord.evalMarks2 = evalMarks2;
//     await existingRecord.save();
//     res.status(200).json({ message: "Evaluation 2 submitted successfully." });
//   } catch (error) {
//     console.error("Error submitting Evaluation 2:", error);
//     res.status(500).json({ message: "Failed to submit Evaluation 2" });
//   }
// });

// export default router;
import express from "express";
import Marks2 from "../models/marks2.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Submit or Update Evaluation 1
// Submit or Update Evaluation 1
router.post("/submit-eval1", verifyToken, async (req, res) => {
  const { rollNo, teamId, evalMarks1 } = req.body;
  const mentorId = req.user.id;

  try {
    if (evalMarks1 === undefined) {
      return res.status(400).json({ message: "Evaluation 1 marks are required." });
    }

    // Find existing record
    let existingRecord = await Marks2.findOne({ rollNo, teamId });

    if (!existingRecord) {
      // If no record exists, create one
      existingRecord = new Marks2({
        rollNo,
        teamId,
        evalMarks1,
        evaluations: [{ mentorId, eval1Submitted: true, eval2Submitted: false }],
      });
    } else {
      // Check if mentor has already submitted evalMarks1
      const mentorEval = existingRecord.evaluations.find(
        (e) => e.mentorId.toString() === mentorId
      );

      if (mentorEval && mentorEval.eval1Submitted) {
        return res.status(400).json({ message: "You have already submitted Evaluation 1." });
      }

      // Average the marks
      if (existingRecord.evalMarks1) {
        existingRecord.evalMarks1 = (existingRecord.evalMarks1 + evalMarks1) / 2;
      } else {
        existingRecord.evalMarks1 = evalMarks1;
      }

      // Update or add mentor evaluation
      if (mentorEval) {
        mentorEval.eval1Submitted = true;
      } else {
        existingRecord.evaluations.push({ mentorId, eval1Submitted: true, eval2Submitted: false });
      }
    }

    await existingRecord.save();
    res.status(200).json({ message: "Evaluation 1 submitted successfully!" });
  } catch (error) {
    console.error("Error submitting Evaluation 1:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Submit or Update Evaluation 2
// Submit or Update Evaluation 2
router.post("/submit-eval2", verifyToken, async (req, res) => {
  const { rollNo, teamId, evalMarks2 } = req.body;
  const mentorId = req.user.id;

  try {
    if (evalMarks2 === undefined) {
      return res.status(400).json({ message: "Evaluation 2 marks are required." });
    }

    const existingRecord = await Marks2.findOne({ rollNo, teamId });

    if (!existingRecord) {
      return res.status(400).json({ message: "No record found. Submit Evaluation 1 first." });
    }

    const mentorEval = existingRecord.evaluations.find(
      (e) => e.mentorId.toString() === mentorId
    );

    if (!mentorEval || !mentorEval.eval1Submitted) {
      return res.status(400).json({ message: "Submit Evaluation 1 before Evaluation 2." });
    }

    if (mentorEval.eval2Submitted) {
      return res.status(400).json({ message: "You have already submitted Evaluation 2." });
    }

    // Average the marks
    if (existingRecord.evalMarks2) {
      existingRecord.evalMarks2 = (existingRecord.evalMarks2 + evalMarks2) / 2;
    } else {
      existingRecord.evalMarks2 = evalMarks2;
    }

    // Update mentor evaluation
    mentorEval.eval2Submitted = true;

    await existingRecord.save();
    res.status(200).json({ message: "Evaluation 2 submitted successfully!" });
  } catch (error) {
    console.error("Error submitting Evaluation 2:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


export default router;
