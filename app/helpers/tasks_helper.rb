module TasksHelper

  # Takes an integer representing seconds elapsed and returns
  # formatted text
  def seconds_to_s(elapsedTime)
    
    hours, minutes, seconds = 0 
    formattedTime = "" 
    
    hours = (elapsedTime / 3600).floor.to_s
    minutes = (elapsedTime / 60).floor.to_s
    seconds = pad((elapsedTime % 60).to_s)
    formattedTime += hours + "h " if hours.to_i > 0 
    formattedTime += minutes + "m " if minutes.to_i > 0 
    formattedTime += seconds + "s " if seconds.to_i > 0 
  end
  
  def pad(number)
    if (number.to_i < 10) then return "0" + number end 
    else return number 
  end

end
