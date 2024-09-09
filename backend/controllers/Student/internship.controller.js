const User = require("../../models/user.model");
const JobSchema = require("../../models/job.model");


const GetInternships = async (req, res) => {
  // console.log(req.query);
  try {
    const student = await User.findById(req.query.studentId);
    if (!student) return res.json({ msg: "Student Not Found!" });

    if (!student?.studentProfile?.internships || student?.studentProfile?.internships?.length === 0) return res.json({ msg: "No Internship Found!" });

    const internship = student?.studentProfile?.internships?.find(intern => { if (intern._id == req.query.internshipId) return intern });

    res.json({ internships: student?.studentProfile?.internships, internship: internship });
  } catch (error) {
    console.log("internship.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

const UpdateInternship = async (req, res) => {
  try {
    const student = await User.findById(req.query.studentId);

    if (!req.body.internship) return res.json({ msg: "No Data received to update!" });
    if (student === undefined) return res.json({ msg: "Student Not Found!" });


    // destructure to store requested val
    const {
      companyName,
      companyAddress,
      companyWebsite,
      internshipDuration,
      startDate,
      endDate,
      monthlyStipend,
      description,
      type,
    } = req.body.internship;


    if (!companyName || !internshipDuration || !startDate || !endDate || !type) return res.json({ msg: "Star marked are mandatory to fill!" });

    // new internship to push
    const newInternship = { type, companyName, companyAddress, companyWebsite, internshipDuration, startDate, endDate, monthlyStipend, description, };


    // if new internship to save or else update existing internship
    if (req.query.internshipId === undefined) {
      // Push the new internship object to the student's internships array
      student.studentProfile.internships.push(newInternship);
    } else {
      // if user is updating existing data 
      const internship = student.studentProfile.internships.find(intern => { if (intern._id == req.body.internshipId) return intern })

      if (companyName) internship.companyName = companyName;
      if (companyAddress) internship.companyAddress = companyAddress;
      if (companyWebsite) internship.companyWebsite = companyWebsite;
      if (internshipDuration) internship.internshipDuration = internshipDuration;
      if (startDate) internship.startDate = startDate;
      if (endDate) internship.endDate = endDate;
      if (monthlyStipend) internship.monthlyStipend = monthlyStipend;
      if (description) internship.description = description;
      if (type) internship.type = type;
    }

    // Save the updated student document
    await student.save();
    // Return a success message
    return res.json({ msg: "Internship Updated Successfully!" });
  } catch (error) {
    console.log("internship.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}


module.exports = {
  GetInternships,
  UpdateInternship,
};