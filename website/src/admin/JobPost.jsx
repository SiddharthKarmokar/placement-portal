import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiFolder,
  FiEdit2,
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiExternalLink,
  FiTrash,
  FiSearch,
  FiDollarSign,
  FiBook,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import JobFormPopup from "./JobFormPopup";
import ModifyJobPopup from "./ModifyJobPopup";
import { API_URL } from "../../env-config";

// const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
//   if (!isOpen) return null;

//   return (
//     <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//       <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//         <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
//           <Dialog.Title className="text-xl font-bold text-gray-800">
//             {title}
//           </Dialog.Title>
//           <p className="mt-2 text-gray-600">{message}</p>
//           <div className="mt-4 flex justify-end space-x-2">
//             <button
//               onClick={onCancel}
//               className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//             >
//               Cancel
//             </button>
//             {/* <button
//               onClick={onConfirm}
//               className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
//             >
//               Delete
//             </button> */}
//           </div>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// };

const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const SERVER_URI = "https://placement-portal-registry-latest.onrender.com";

  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/jobs/get-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setJobs(Array.isArray(res.data) ? res.data : []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        toast.error("Failed to fetch jobs");
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handlePostJob = async (jobData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/api/jobs/create`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setJobs([...jobs, res.data]);
      setShowPostPopup(false);
      toast.success("Job posted successfully!");
    } catch (err) {
      console.error("Error posting job:", err);
      toast.error("Failed to post job");
    }
  };

  const handleModifyJob = async (updatedJob) => {
    try {
      const token = localStorage.getItem("token");

      // Extract only the fields that the API expects in the request body
      const requestBody = {
        batch: updatedJob.batch || [],
        selection_process: updatedJob.selection_process || [],
      };

      // Create query parameters for all other fields
      const queryParams = new URLSearchParams();

      // Add all the query parameters
      if (updatedJob.company_name)
        queryParams.append("company_name", updatedJob.company_name);
      if (updatedJob.website) queryParams.append("website", updatedJob.website);
      if (updatedJob.linkedin_link)
        queryParams.append("linkedin_link", updatedJob.linkedin_link);
      if (updatedJob.address) queryParams.append("address", updatedJob.address);
      if (updatedJob.work_location)
        queryParams.append("work_location", updatedJob.work_location);
      if (updatedJob.job_designation)
        queryParams.append("job_designation", updatedJob.job_designation);
      if (updatedJob.type_of_employment)
        queryParams.append("type_of_employment", updatedJob.type_of_employment);
      if (updatedJob.eligibility_criteria)
        queryParams.append(
          "eligibility_criteria",
          updatedJob.eligibility_criteria
        );
      if (updatedJob.applicable_branch)
        queryParams.append("applicable_branch", updatedJob.applicable_branch);
      if (updatedJob.stipend) queryParams.append("stipend", updatedJob.stipend);
      if (updatedJob.ctc) queryParams.append("ctc", updatedJob.ctc);
      if (updatedJob.other_benefits)
        queryParams.append("other_benefits", updatedJob.other_benefits);
      if (updatedJob.bond) queryParams.append("bond", updatedJob.bond);
      if (updatedJob.job_description)
        queryParams.append("job_description", updatedJob.job_description);
      if (updatedJob.about_company)
        queryParams.append("about_company", updatedJob.about_company);
      if (updatedJob.form_link)
        queryParams.append("form_link", updatedJob.form_link);
      if (updatedJob.application_deadline)
        queryParams.append(
          "application_deadline",
          updatedJob.application_deadline
        );

      // Make the PUT request with query parameters and request body
      const res = await axios.put(
        `${API_URL}/api/jobs/update/${
          updatedJob._id
        }?${queryParams.toString()}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setJobs(jobs.map((job) => (job._id === updatedJob._id ? res.data : job)));
      setShowModifyPopup(false);
      toast.success("Job updated successfully!");
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error("Failed to update job");
    }
  };

  // const handleDeleteJob = async (jobId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.delete(`${SERVER_URI}/api/jobs/${jobId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setJobs(jobs.filter((job) => job._id !== jobId));
  //     setShowDeleteModal(false);
  //     toast.success("Job deleted successfully!");
  //   } catch (err) {
  //     console.error("Error deleting job:", err);
  //     toast.error("Failed to delete job");
  //   }
  // };

  const handleSyncJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/jobs/sync-expired`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Jobs synced successfully!");
    } catch (err) {
      console.error("Error syncing jobs:", err);
      toast.error("Failed to sync jobs");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.job_designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || job.type_of_employment?.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-[#F5F7FC] min-h-screen p-8 font-[Figtree]">
      <div className="max-w-6xl mx-auto">
        {/* Header with Title and Create Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Job Postings</h1>
          <div className="flex justify-between items-center gap-5">
            <button
              onClick={handleSyncJobs}
              className="flex items-center gap-2 px-4 py-2 bg-[#57C62B] text-white rounded-xl shadow-lg hover:bg-[#4da72a] transition-colors"
            >
              Sync Jobs
            </button>
            <button
              onClick={() => setShowPostPopup(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl shadow-lg hover:bg-gray-900 transition-colors"
            >
              <span className="text-xl">+</span> Post a Job
            </button>
          </div>
        </div>
        <hr className="border-gray-300 mb-6" />

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by designation or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Job Cards */}
        <div className="space-y-6 mt-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">
                No jobs found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Company and Job Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {job.job_designation}
                          </h2>
                          <p className="text-lg font-semibold text-gray-700">
                            {job.company_name}
                          </p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {job.type_of_employment}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMapPin className="text-gray-400" />
                          <span>{job.work_location || "Not specified"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiUser className="text-gray-400" />
                          <span>{job.applicable_branch || "All branches"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiDollarSign className="text-gray-400" />
                          <span>
                            {job.ctc
                              ? `CTC: ${job.ctc}`
                              : job.stipend
                              ? `Stipend: ${job.stipend}`
                              : "Salary not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiCalendar className="text-gray-400" />
                          <span>
                            Batch: {job.batch?.join(", ") || "Not specified"}
                          </span>
                        </div>
                      </div>

                      {job.eligibility_criteria && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-gray-700 mb-2">
                            Eligibility Criteria
                          </h4>
                          <p className="text-sm text-gray-600">
                            {job.eligibility_criteria}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions and Additional Info */}
                    <div className="lg:w-80 space-y-4">
                      {/* Application Deadline */}
                      {job.application_deadline && (
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-red-700">
                            <FiClock className="text-red-500" />
                            <span className="font-semibold">Apply before:</span>
                          </div>
                          <p className="text-sm text-red-600 mt-1">
                            {formatDateTime(job.application_deadline)}
                          </p>
                        </div>
                      )}

                      {/* Selection Process */}
                      {job.selection_process &&
                        job.selection_process.length > 0 && (
                          <div className="bg-green-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-green-700 mb-2">
                              Selection Process
                            </h4>
                            <ol className="list-decimal list-inside text-sm text-green-600 space-y-1">
                              {job.selection_process.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setShowModifyPopup(true);
                          }}
                          className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <FiEdit2 size={16} />
                          Edit
                        </button>
                        <div className="flex justify-around items-center">
                          <a
                            href={job.responses_sheet_link}
                            target="_blank"
                            className="flex items-center w-[40%] justify-center gap-2 bg-[#10793F] hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <img
                              src="/excel-logo.png"
                              width={24}
                              height={24}
                              alt=""
                            />
                            Response
                          </a>
                          <a
                            href={job.master_sheet_link}
                            target="_blank"
                            className="flex items-center w-[40%] justify-center gap-2 bg-[#10793F] hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <img
                              src="/excel-logo.png"
                              width={24}
                              height={24}
                              alt=""
                            />
                            Master
                          </a>
                        </div>
                        {/* <button
                          onClick={() => {
                            setSelectedJob(job);
                            setShowDeleteModal(true);
                          }}
                          className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          <FiTrash size={16} className="text-red-500" />
                          Delete
                        </button> */}
                        {/* {job.form_link && (
                          <a
                            href={job.form_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <FiExternalLink size={16} />
                            Apply Now
                          </a>
                        )} */}
                      </div>

                      {/* Created Info */}
                      <div className="text-xs text-gray-500">
                        <p>Created: {formatDate(job.created_at)}</p>
                        {job.updated_at && (
                          <p>Updated: {formatDate(job.updated_at)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popups */}
      {showPostPopup && (
        <JobFormPopup
          onClose={() => setShowPostPopup(false)}
          onSubmit={handlePostJob}
        />
      )}
      {showModifyPopup && selectedJob && (
        <ModifyJobPopup
          job={selectedJob}
          onClose={() => setShowModifyPopup(false)}
          onSubmit={handleModifyJob}
        />
      )}
      {/* <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the job posting for "${selectedJob?.job_designation}" at "${selectedJob?.company_name}"? This action cannot be undone.`}
        onConfirm={() => handleDeleteJob(selectedJob?._id)}
        onCancel={() => setShowDeleteModal(false)}
      /> */}
      <ToastContainer />
    </div>
  );
};

export default JobPost;
