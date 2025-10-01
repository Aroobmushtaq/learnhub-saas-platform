import { Star, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; 
import { Card } from "../components/ui/card";

export const CourseCard = ({
  id,
  title,
  description,
  instructor,
  rating,
  students,
  duration,
  image,
  price,
}) => {
  return (
    <Card className="card-elevated overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-primary">{price}</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-muted-foreground mb-3">by {instructor}</p>
          <Link to={`/courses/${id}`}>
            <Button className="w-full bg-primary hover:bg-primary/90">
              View Course
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
