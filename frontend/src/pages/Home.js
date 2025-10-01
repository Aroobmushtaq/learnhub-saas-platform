import { ArrowRight, BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CourseCard } from "../components/CourseCard";
import heroImage from "../assets/hero-learning.jpg";
import courseWeb from "../assets/course-web.jpg";
import courseData from "../assets/course-data.jpg";
import courseDesign from "../assets/course-design.jpg";

const featuredCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, and Node.js from scratch",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12500,
    duration: "40h",
    image: courseWeb,
    price: "$89.99",
  },
  {
    id: "2",
    title: "Data Science & Machine Learning",
    description: "Learn Python, data analysis, and machine learning algorithms",
    instructor: "Dr. Michael Chen",
    rating: 4.9,
    students: 9800,
    duration: "35h",
    image: courseData,
    price: "$99.99",
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    description: "Create beautiful and intuitive user interfaces with Figma",
    instructor: "Emma Williams",
    rating: 4.7,
    students: 8200,
    duration: "28h",
    image: courseDesign,
    price: "$79.99",
  },
];

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Software Engineer",
    content: "LearnHub transformed my career. The courses are comprehensive and the instructors are world-class.",
    avatar: "AT",
  },
  {
    name: "Maria Garcia",
    role: "UX Designer",
    content: "The platform is intuitive and the learning experience is exceptional. Highly recommended!",
    avatar: "MG",
  },
  {
    name: "James Wilson",
    role: "Data Analyst",
    content: "I've tried many platforms, but LearnHub stands out with its quality content and supportive community.",
    avatar: "JW",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Learn Without Limits
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover thousands of courses from expert instructors. Build skills, advance your career, and achieve your goals with LearnHub.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button className="btn-hero">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="lg" className="rounded-xl">
                    Browse Courses
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Students learning together"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose LearnHub?</h2>
            <p className="text-xl text-muted-foreground">Everything you need to succeed in your learning journey</p>
          </div>
          
          <div className="flex justify-center gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Expert Instructors</h3>
              <p className="text-muted-foreground">Learn from industry professionals with real-world experience</p>
            </div>    
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Career Growth</h3>
              <p className="text-muted-foreground">Advance your career with in-demand skills</p>
            </div>
          </div>
        </div>
      </section>

      Featured Courses
      <section className="section-padding bg-accent/20">
        <div className="container mx-auto px-4 ">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Courses</h2>
              <p className="text-xl text-muted-foreground">Start learning with our most popular courses</p>
            </div>
            <Link to="/courses">
              <Button variant="outline">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied learners</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elevated">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">Join LearnHub today and unlock your potential</p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="rounded-xl px-8 py-6 text-lg">
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
