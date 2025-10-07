import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Star, BookOpen, Award, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { fetchCourses } from "../features/courses/courseSlice";

export default function CourseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // If course exists in Redux, use it — otherwise fetch from API
  useEffect(() => {
    const found = courses.find((c) => c._id === id);
    if (found) {
      setCourse(found);
      setLoading(false);
    } else {
      // fetch directly from backend
      const fetchCourse = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
          setCourse(res.data);
        } catch (err) {
          console.error("Error fetching course:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [id, courses]);

  // Also make sure all courses are fetched to populate Redux for later use
  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  const handleCheckout = async () => {
    try {
      if (!user?.token) {
        alert("Please login first!");
        return;
      }

      const res = await axios.post(
        `http://localhost:5000/api/payments/create-checkout-session/${course._id}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while starting payment");
    }
  };

  if (loading) return <p className="text-gray-500 text-center">Loading course...</p>;
  if (!course) return <p className="text-red-500 text-center">Course not found</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/courses">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>

      {/* Course Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">{course.title}</h1>
              <p className="text-xl text-muted-foreground">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-medium">{course.rating || 4.5}</span>
                  <span className="text-muted-foreground">
                    ({course.students || 0} students)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span>{course.level || "Beginner"}</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-4xl font-bold text-primary">${course.price}</span>
                  <span className="text-muted-foreground">one-time payment</span>
                </div>

                {user?.role?.toLowerCase() === "student" ? (
                  <Button onClick={handleCheckout} className="btn-hero w-full md:w-auto">
                    Enroll Now
                  </Button>
                ) : user?.role?.toLowerCase() === "admin" ? (
                  <p className="text-gray-500 italic text-sm">Admins cannot enroll in courses.</p>
                ) : user?.role?.toLowerCase() === "instructor" ? (
                  <p className="text-gray-500 italic text-sm">Instructors cannot enroll in courses.</p>
                ) : (
                  <Link to="/login">
                    <Button className="btn-hero w-full md:w-auto">Login to Enroll</Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {course.image && (
                <img
                  src={
                    course.image.startsWith("http")
                      ? course.image
                      : `http://localhost:5000/${course.image.replace(/\\/g, "/")}`
                  }
                  alt={course.title}
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              {course.whatYouWillLearn && (
                <div className="card-elevated">
                  <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {course.lessons && (
                <div className="card-elevated">
                  <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                  <div className="space-y-3">
                    {course.lessons.map((lesson, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {idx + 1}
                            </span>
                          </div>
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {course.requirements && (
                <div className="card-elevated">
                  <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                  <ul className="space-y-3">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
