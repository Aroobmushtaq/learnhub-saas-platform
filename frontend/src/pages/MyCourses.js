import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCourses } from "../features/courses/courseSlice";
import { Link } from "react-router-dom";
import { Clock, BookOpen } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card"; // adjust the path if different

const MyCourses = () => {
  const dispatch = useDispatch();
  const { myCourses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">My Enrolled Courses</h2>
          <p className="text-muted-foreground text-lg">
            Track your enrolled courses and continue learning.
          </p>
        </div>

        {/* Course Cards */}
        {myCourses.length === 0 ? (
          <p className="text-muted-foreground">No courses enrolled yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {myCourses.map((enrollment) => (
              <Card key={enrollment._id} className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle>
                    {enrollment.course?.title || "Untitled Course"}
                  </CardTitle>
                  <CardDescription>
                    {enrollment.course?.description ||
                      "No description available."}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>Price: ${enrollment.course?.price || 0}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Self-paced</span>
                    </div>
                </CardContent>

                <CardFooter className="justify-start">
                  <Link
                    to={`/courses/${enrollment.course?._id}/lessons`}
                    className="px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition"
                  >
                    View Lessons
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
