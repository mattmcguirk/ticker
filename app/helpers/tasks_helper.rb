module TasksHelper

  # Takes an integer representing seconds elapsed and returns
  # formatted text


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
              'One cloud plus one cloud equals one cloud.'
            ]
    quips.shuffle.first
  end
  
  def formatted_day(t)
    t.created_at.in_time_zone(current_user.time_zone).strftime('%A, %B %d %Y')
  end

end
