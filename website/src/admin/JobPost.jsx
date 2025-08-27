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
} from "react-icons/fi";
import { IndianRupee } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the new popup components
import JobFormPopup from "./JobFormPopup";
import ModifyJobPopup from "./ModifyJobPopup";
import { API_URL } from "../../env-config";

// Helper components and data
const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];

/**
 * A simple confirmation modal component to replace `window.confirm`.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.message - The message to display.
 * @param {function} props.onConfirm - The function to call on confirm.
 * @param {function} props.onCancel - The function to call on cancel.
 */
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-xl font-bold text-gray-800">
            {title}
          </Dialog.Title>
          <p className="mt-2 text-gray-600">{message}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

/**
 * The main Job Postings component.
 * This component fetches, displays, and manages job postings.
 */
const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetches jobs from the backend on component mount.
    useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You are not authenticated. Please log in.");
          setIsLoading(false);
          return;
        }

        const res = await axios.get(`${API_URL}/api/jobs/get-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach JWT
            "Content-Type": "application/json",
          },
        });

        // handle flexible API response structure
        setJobs(Array.isArray(res.data) ? res.data : res.data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        toast.error(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handlePostJob = async (jobData) => {
    try {
      console.log(jobData);
      const res = await axios.post(`${API_URL}/api/jobs/create`, jobData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setJobs([...jobs, res.data]);
      setShowPostPopup(false);
      toast.success("Job posted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post job");
    }
  };

  const handleModifyJob = async (updatedJob) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/jobs/${updatedJob._id}`,
        updatedJob
      );
      setJobs(jobs.map((job) => (job._id === updatedJob._id ? res.data : job)));
      setShowModifyPopup(false);
      toast.success("Job updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job");
    }
  };

  const handleSyncJobs = async () => {
    try {
      await axios.post(`${API_URL}/api/jobs/sync-expired`);
      toast.success("Job Synced successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to Sync jobs");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || (job.type && job.type.toLowerCase() === filter); // Added a check for job.type
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#F5F7FC] min-h-screen p-8 font-[Figtree]">
      <div className="max-w-4xl mx-auto">
        {/* Header with Title and Create Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Jobs</h1>
          <div className="flex justify-between items-center gap-5">
            <button
              onClick={handleSyncJobs}
              className="flex items-center gap-2 px-4 py-2 bg-[#57C62B] active:bg-[#57C62B] text-white rounded-xl shadow-lg hover:bg-[#4da72a] transition-colors"
            >
              Sync Jobs
            </button>
            <button
              onClick={() => setShowPostPopup(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black active:bg-black text-white rounded-xl shadow-lg hover:bg-gray-900 transition-colors"
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
              placeholder="Search by title or company..."
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
                  className="bg-white rounded-3xl border-2 border-solid p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row w-full justify-between gap-6">
                    <div className="flex-1 space-y-2">
                      <div className="text-gray-800 font-semibold text-lg">
                        {job.company}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {job.title}
                      </div>
                      <div className="flex flex-wrap gap-3 items-center text-gray-600 space-x-4 text-sm mt-2">
                        {job.location && (
                          <div className="flex bg-[#F5F7FC] rounded-3xl items-center object-contain gap-1 py-1 px-2">
                            <FiMapPin className="text-gray-400" />
                            <span>{job.location}</span>
                          </div>
                        )}
                        {job.batch && job.batch.length > 0 && (
                          <div className="flex bg-[#F5F7FC] rounded-3xl items-center object-contain gap-1 py-1 px-2">
                            <FiBriefcase className="text-gray-400" />
                            <span>Batch: {job.batch.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 border-l-2 pl-4 md:border-l-0 md:pl-0 md:border-t-2 md:pt-4 border-gray-200">
                      <h3 className="font-semibold text-gray-700">
                        Eligibility Criteria
                      </h3>
                      <hr className="my-1 border-gray-200" />
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {job.CG_Cutoff && <li>CGPA above {job.CG_Cutoff}</li>}
                        {job.gender_preference &&
                          job.gender_preference.length > 0 && (
                            <li>{job.gender_preference.join(" & ")} only</li>
                          )}
                        {job.application_deadline && (
                          <li>
                            Apply before:{" "}
                            {new Date(
                              job.application_deadline
                            ).toLocaleDateString()}
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[120px]">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowModifyPopup(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg active:bg-black transition-colors"
                      >
                        <FiEdit2 size={16} />
                        Edit
                      </button>
                      {/* <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowDeleteModal(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-white border-2 border-solid px-4 py-2 hover:bg-gray-200 active:bg-white rounded-lg transition-colors"
                      >
                        <FiTrash size={16} className="text-red-500" />
                        Delete
                      </button> */}
                      {job.form_link && (
                        <a
                          href={job.form_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-white border-2 border-solid px-4 py-2 hover:bg-gray-200 active:bg-white rounded-lg transition-colors"
                        >
                          <FiExternalLink size={16} className="text-blue-500" />
                          Apply
                        </a>
                      )}
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
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the job posting for "${selectedJob?.title}" at "${selectedJob?.company}"? This action cannot be undone.`}
        onConfirm={() => handleDeleteJob(selectedJob._id)}
        onCancel={() => setShowDeleteModal(false)}
      />
      <ToastContainer />
    </div>
  );
};

export default JobPost;
