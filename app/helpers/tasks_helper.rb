module TasksHelper

  # Takes an integer representing seconds elapsed and returns
  # formatted text
  def seconds_to_s(elapsedTime)
    
    hours, minutes, seconds = 0 
    formattedTime = "" 
    
    hours = (elapsedTime / 3600).floor.to_s
    minutes = ((elapsedTime % 3600).floor / 60).floor.to_s
    seconds = pad((elapsedTime % 60).to_s)
    formattedTime += hours + "h " if hours.to_i > 0 
    formattedTime += minutes + "m " if minutes.to_i > 0 
    formattedTime += seconds + "s " if seconds.to_i > 0 
  end
  
  def pad(number)
    if (number.to_i < 10 && number.to_i > 59) 
      return "0" + number  
    else 
      return number
    end
  end

  def quip
    quips = [ 'Enjoy this zen-like calm while it lasts.',
              'Meditate on nothingness.',
              'Have you considered a dramatic career change?',
              'Everyday, give yourself a present.',
              'Time is an illusion. Lunch time doubly so.',
              'Dig a hole. Fill it up.',
              'Cat\'s in the bag. Bag\'s in the river.',
              'Sometimes you have to roll the hard six.',
              'If the only thing you have is a fork, everything looks like linguini.',
              'Confront the spectacle with its own irrelevance',
              'Saying nothing is a valid response.',
              'One cloud plus one cloud equals one cloud.',
              'Fear is the mind killer.'
            ]
    quips.shuffle.first
  end
  
  def formatted_day(t)
    t.created_at.in_time_zone(current_user.time_zone).strftime('%A, %B %d %Y')
  end

end
