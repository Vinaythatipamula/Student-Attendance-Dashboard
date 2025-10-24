import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  fetchSummaryStart,
  fetchSummarySuccess,
  fetchSummaryFailure,
} from "../store/slices/attendanceSlice";
import { Card, LoadingSpinner, Alert } from "../components/ui";

const AttendanceSummary = () => {
  const dispatch = useDispatch();
  const { summary, loading, error } = useSelector((state) => state.attendance);
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    try {
      dispatch(fetchSummaryStart());

      setTimeout(() => {
        if (!students || students.length === 0) {
          dispatch(fetchSummaryFailure("No student data available."));
          return;
        }

        const presentCount = students.filter((s) => s.isPresent).length;
        const absentCount = students.length - presentCount;

        const mockSummary = {
          totalStudents: students.length,
          presentStudents: presentCount,
          absentStudents: absentCount,
          attendancePercentage: Math.round((presentCount / students.length) * 100),
        };

        dispatch(fetchSummarySuccess(mockSummary));
      }, 1000);
    } catch (err) {
      dispatch(fetchSummaryFailure("Error while calculating summary."));
    }
  }, [dispatch, students]);

  // Mock chart data
  const weeklyData = [
    { day: "Mon", present: 8, absent: 2 },
    { day: "Tue", present: 9, absent: 1 },
    { day: "Wed", present: 7, absent: 3 },
    { day: "Thu", present: 10, absent: 0 },
    { day: "Fri", present: 8, absent: 2 },
  ];

  const monthlyData = [
    { week: "Week 1", attendance: 85 },
    { week: "Week 2", attendance: 92 },
    { week: "Week 3", attendance: 78 },
    { week: "Week 4", attendance: 88 },
  ];

  const pieData = [
    { name: "Present", value: summary.presentStudents || 0, color: "#10B981" },
    { name: "Absent", value: summary.absentStudents || 0, color: "#EF4444" },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} className="max-w-2xl mx-auto" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Summary</h1>
        <p className="text-gray-600">Overview of student attendance patterns</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {summary.totalStudents || 0}
          </div>
          <div className="text-sm text-gray-600">Total Students</div>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {summary.presentStudents || 0}
          </div>
          <div className="text-sm text-gray-600">Present Today</div>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-red-600">
            {summary.absentStudents || 0}
          </div>
          <div className="text-sm text-gray-600">Absent Today</div>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {summary.attendancePercentage || 0}%
          </div>
          <div className="text-sm text-gray-600">Attendance Rate</div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card title="Today's Attendance Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar Chart */}
        <Card title="Weekly Attendance Trend">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10B981" name="Present" />
                <Bar dataKey="absent" fill="#EF4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Line Chart */}
      <Card title="Monthly Attendance Percentage">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, "Attendance"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                name="Attendance %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Statistics */}
      <Card title="Detailed Statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {summary.totalStudents
                ? Math.round(
                    (summary.presentStudents / summary.totalStudents) * 100
                  )
                : 0}
              %
            </div>
            <div className="text-sm text-green-700">Present Rate</div>
          </div>

          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {summary.totalStudents
                ? Math.round(
                    (summary.absentStudents / summary.totalStudents) * 100
                  )
                : 0}
              %
            </div>
            <div className="text-sm text-red-700">Absent Rate</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {(summary.presentStudents || 0).toString()}
            </div>
            <div className="text-sm text-blue-700">Students Present</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceSummary;





