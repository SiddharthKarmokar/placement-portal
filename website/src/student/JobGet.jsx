import React, { useState, useEffect } from "react";
import { FiBriefcase, FiMapPin, FiClock, FiChevronDown } from "react-icons/fi";
import { ArrowUpDown } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../env-config";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const JobDetails = ({ job }) => {
  if (!job) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{job.company}</h3>
      <p className="text-gray-600 mb-4">{job.job_description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Location:</span> {job.location}
        </div>
        <div>
          <span className="font-semibold">Batch:</span>{" "}
          {job.batch?.join(", ") || "—"}
        </div>
        <div>
          <span className="font-semibold">CGPA Cutoff:</span> {job.CG_Cutoff}
        </div>
        <div>
          <span className="font-semibold">Gender Preference:</span>{" "}
          {job.gender_preference?.join(", ") || "Any"}
        </div>
        <div>
          <span className="font-semibold">Deadline:</span>{" "}
          {new Date(job.application_deadline).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

const JobGet = () => {
  const [jobs, setJobs] = useState([]);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [batchFilter, setBatchFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [cgpaSort, setCgpaSort] = useState(null); // "asc" | "desc" | null

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/api/jobs/get-jobs`);
        setJobs(Array.isArray(res.data) ? res.data : res.data.jobs || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch jobs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filtering
  let filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBatch =
      batchFilter === "all" || job.batch?.includes(Number(batchFilter));

    const matchesLocation =
      locationFilter === "all" ||
      job.location?.toLowerCase() === locationFilter.toLowerCase();

    const matchesGender =
      genderFilter === "all" ||
      job.gender_preference?.includes(genderFilter);

    return matchesSearch && matchesBatch && matchesLocation && matchesGender;
  });

  // Sorting (CGPA)
  if (cgpaSort === "asc") {
    filteredJobs.sort((a, b) => a.CG_Cutoff - b.CG_Cutoff);
  } else if (cgpaSort === "desc") {
    filteredJobs.sort((a, b) => b.CG_Cutoff - a.CG_Cutoff);
  }

  const handleApply = (job) => {
    if (job.form_link) {
      window.open(job.form_link, "_blank");
    } else {
      toast.error("Application link not available.");
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen p-8 font-[Figtree]">
      <div className="max-w-5xl mx-auto">
        {/* Sticky Filter Bar */}
        <div className="sticky top-0 bg-[#F3F4F6] z-10 pb-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>

            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border rounded-xl shadow-sm bg-white"
              />

              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="px-3 py-2 border rounded-xl shadow-sm bg-white"
              >
                <option value="all">All Batches</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-3 py-2 border rounded-xl shadow-sm bg-white"
              >
                <option value="all">All Locations</option>
                {Array.from(new Set(jobs.map((j) => j.location))).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-3 py-2 border rounded-xl shadow-sm bg-white"
              >
                <option value="all">Any Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <button
                onClick={() =>
                  setCgpaSort((prev) =>
                    prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
                  )
                }
                className="px-3 py-2 border rounded-xl shadow-sm bg-white flex items-center gap-2"
              >
                <ArrowUpDown className="w-4 h-4" />
                {cgpaSort === "asc"
                  ? "CGPA ↑"
                  : cgpaSort === "desc"
                  ? "CGPA ↓"
                  : "Sort CGPA"}
              </button>
            </div>
          </div>
          <hr className="mt-3" />
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
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-md border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-lg transition"
                >
                  <div className="flex-1 space-y-2">
                    <div className="text-gray-800 font-semibold text-lg">
                      {job.company}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {job.title}
                    </div>

                    <div className="flex flex-wrap gap-3 items-center text-gray-600 text-sm mt-2">
                      <div className="flex items-center bg-[#F9FAFB] rounded-2xl gap-1 px-2 py-1">
                        <FiMapPin className="text-gray-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center bg-[#F9FAFB] rounded-2xl gap-1 px-2 py-1">
                        <FiClock className="text-gray-400 w-4 h-4" />
                        <span>
                          {new Date(
                            job.application_deadline
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center bg-[#F9FAFB] rounded-2xl gap-1 px-2 py-1">
                        <span>CGPA {job.CG_Cutoff}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 min-w-[120px]">
                    <button
                      onClick={() => handleApply(job)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowDetailsPopup(true);
                      }}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsPopup && selectedJob && (
        <Modal onClose={() => setShowDetailsPopup(false)}>
          <JobDetails job={selectedJob} />
        </Modal>
      )}
    </div>
  );
};

export default JobGet;
