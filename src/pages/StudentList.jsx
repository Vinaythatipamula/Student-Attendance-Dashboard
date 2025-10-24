import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchStudentsStart, 
  fetchStudentsSuccess, 
  fetchStudentsFailure, 
  updateStudentAttendance,
  resetAttendanceForNewDay,
  clearCurrentAttendance
} from '../store/slices/studentsSlice';
import { 
  submitAttendanceStart, 
  submitAttendanceSuccess,
} from '../store/slices/attendanceSlice';
import { Card, Button, ToggleButton, Alert, LoadingSpinner } from '../components/ui';

const StudentList = () => {
  const { students, loading, error } = useSelector((state) => state.students);
  const { loading: submitLoading } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Only fetch students if we don't have any in the store
    if (students.length === 0) {
      dispatch(fetchStudentsStart());
      
      // Mock data - only load if no students exist
      setTimeout(() => {
        const mockStudents = [
          { id: 1, name: 'Alice Johnson', rollNumber: '001', isPresent: false },
          { id: 2, name: 'Bob Smith', rollNumber: '002', isPresent: false },
          { id: 3, name: 'Charlie Brown', rollNumber: '003', isPresent: false },
          { id: 4, name: 'Diana Prince', rollNumber: '004', isPresent: false },
          { id: 5, name: 'Eve Wilson', rollNumber: '005', isPresent: false },
          { id: 6, name: 'Frank Miller', rollNumber: '006', isPresent: false },
          { id: 7, name: 'Grace Lee', rollNumber: '007', isPresent: false },
          { id: 8, name: 'Henry Davis', rollNumber: '008', isPresent: false },
          { id: 9, name: 'Ivy Chen', rollNumber: '009', isPresent: false },
          { id: 10, name: 'Jack Taylor', rollNumber: '010', isPresent: false },
        ];
        dispatch(fetchStudentsSuccess(mockStudents));
      }, 1000);
    }
  }, [dispatch, students.length]);


  const handleToggleAttendance = (studentId, isPresent) => {
    dispatch(updateStudentAttendance({ studentId, isPresent }));
  };

  const handleSubmitAttendance = async () => {
    setSubmitError(null);
    setSubmitSuccess(false);

    dispatch(submitAttendanceStart());

    // Simulate API delay
    setTimeout(() => {
      const attendanceData = students.map((student) => ({
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        isPresent: student.isPresent,
      }));

      dispatch(submitAttendanceSuccess(attendanceData));

      setSubmitSuccess(true);
      
      dispatch(clearCurrentAttendance());
      
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  const handleNewDay = () => {
    if (window.confirm('Are you sure you want to start a new day? This will reset all attendance for today.')) {
      dispatch(resetAttendanceForNewDay());
    }
  };


  const presentCount = students.filter(student => student.isPresent).length;
  const totalCount = students.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert 
        type="error" 
        message={error} 
        className="max-w-2xl mx-auto"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Attendance</h1>
          <p className="text-gray-600">Mark attendance for your students</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Present: <span className="font-semibold text-green-600">{presentCount}</span> / 
            Total: <span className="font-semibold">{totalCount}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleNewDay}
              variant="outline"
              size="sm"
            >
              New Day
            </Button>
            
            <Button
              onClick={handleSubmitAttendance}
              loading={submitLoading}
              disabled={submitLoading}
              variant="success"
            >
              Submit Attendance
            </Button>
          </div>
        </div>
      </div>

      {submitSuccess && (
        <Alert 
          type="success" 
          message="Attendance submitted successfully!" 
          onClose={() => setSubmitSuccess(false)}
        />
      )}

      {submitError && (
        <Alert 
          type="error" 
          message={submitError} 
          onClose={() => setSubmitError(null)}
        />
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.isPresent 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.isPresent ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <ToggleButton
                      isPresent={student.isPresent}
                      onToggle={(isPresent) => handleToggleAttendance(student.id, isPresent)}
                      studentName={student.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StudentList;












